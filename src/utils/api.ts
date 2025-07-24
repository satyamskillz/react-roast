import { ScreenshotBlobs, ScreenshotType } from "./types";
import * as device from "react-device-detect";
import config from "./config";

const webhookAPI = config.webhookAPI;

interface UploadImageToS3Props {
    uploadURL: string; // Pre-signed URL for S3 upload
    imageBlob: Blob | null; // Image blob to be uploaded
}

interface RoastToDBProps {
    message: string; // Message to be sent
    screenshots: Array<{
        // Array of screenshots
        type: ScreenshotType;
        key: string; // Key of the screenshot in S3
    }>;
}

interface SendRoastProps {
    message: string; // Message to be sent
    screenshotBlobs: ScreenshotBlobs; // Array of screenshot blobs
}

class ApiInstance {
    private siteId: string;

    constructor({ siteId }: { siteId: string }) {
        if (!siteId) throw new Error("siteId is required");
        this.siteId = siteId;
    }

    private async retry<T>(
        fn: () => Promise<T>, // Function to retry
        retries: number = 3, // Number of retries
        delayMs: number = 3000 // 3 seconds
    ): Promise<T> {
        let attempt = 0;
        while (attempt < retries) {
            try {
                return await fn();
            } catch (error) {
                attempt++;
                if (attempt >= retries) throw error;
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
        }
        throw new Error("Unexpected error in retry function");
    }

    private async getPreSignedUrl(type: string) {
        return this.retry(async () => {
            const contentType = "image/png";
            const fileName = `${type}.png`;

            const response = await fetch(webhookAPI + "/v1/get-upload-url", {
                method: "POST",
                headers: {
                    "X-Site-Code": this.siteId,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contentType,
                    fileName,
                }),
            });

            if (!response.ok) throw new Error("Error getting pre-signed URL");

            const parsedResponse = await response.json();
            return {
                uploadURL: parsedResponse.url,
                imageKey: parsedResponse.key,
            };
        });
    }

    private async uploadImageToS3(props: UploadImageToS3Props) {
        return this.retry(async () => {
            const { uploadURL, imageBlob } = props;

            if (!uploadURL || !imageBlob) throw new Error("uploadURL and elementImageBlob are required");

            const response = await fetch(uploadURL, {
                headers: { "Content-Type": "image/png" },
                redirect: "follow",
                body: imageBlob,
                method: "PUT",
            });

            if (!response.ok) throw new Error("Error uploading image");

            return response;
        });
    }

    private async submitRoastToDB(props: RoastToDBProps) {
        return this.retry(async () => {
            const { message, screenshots } = props;

            const response = await fetch(webhookAPI + "/v1/submit-feedback", {
                method: "POST",
                headers: {
                    "X-Site-Code": this.siteId,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                    screenshots,
                    deviceInfo: {
                        type: device.deviceType,
                        userAgent: device.getUA,
                        page: {
                            title: document.title,
                            url: window.location.href,
                        },
                        screen: {
                            width: window.innerWidth,
                            height: window.innerHeight,
                            DPR: window.devicePixelRatio,
                            orientation: window.screen.orientation ? window.screen.orientation.type : "unknown",
                        },
                        engine: {
                            name: device.engineName,
                            version: device.engineVersion,
                        },
                        browser: {
                            name: device.browserName,
                            majorVersion: device.browserVersion,
                            fullVersion: device.fullBrowserVersion,
                        },
                        mobile: {
                            model: device.mobileModel,
                            vendor: device.mobileVendor,
                        },
                        os: {
                            name: device.osName,
                            version: device.osVersion,
                        },
                    },
                }),
            });

            if (!response.ok) throw new Error("Error submitting roast to DB");

            return await response.json();
        });
    }

    async sendRoast({ message, screenshotBlobs }: SendRoastProps) {
        try {
            let screenshots = [];

            if (!message || !screenshotBlobs || screenshotBlobs.length === 0) {
                throw new Error("Message and screenshot blobs are required");
            }

            // toast.info(screenshotBlobs.length);
            // throw new Error("Testing error handling");

            for (const screenshot of screenshotBlobs) {
                // Validate screenshot
                if (!screenshot.blob || !screenshot.type) continue;
                if (!(screenshot.blob instanceof Blob)) throw new Error("Invalid screenshot blob");
                if (screenshot.blob.size === 0) throw new Error("Screenshot blob is empty");

                // Get pre-signed URL for S3 upload
                const { uploadURL, imageKey } = await this.getPreSignedUrl(screenshot.type);

                // Upload the image to S3
                await this.uploadImageToS3({ uploadURL, imageBlob: screenshot.blob });

                // Add the screenshot data to the array
                screenshots.push({
                    type: screenshot.type,
                    key: imageKey,
                });
            }

            // Submit the roast to the database
            const response = await this.submitRoastToDB({ message, screenshots });

            return {
                trackingUrl: response.trackingUrl,
                message: "Roasted successfully!",
                success: true,
            };
        } catch (error) {
            return {
                message: "Failed to roast, try again!",
                success: false,
            };
        }
    }
}

export default ApiInstance;
