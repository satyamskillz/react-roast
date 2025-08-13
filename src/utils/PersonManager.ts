interface Person {
    id: string; // Unique identifier for the person
    hasEmail: boolean; // Optional flag to indicate if the person has an email
}

class PersonManager {
    private storageKey: string;
    constructor() {
        this.storageKey = "rrn-person-data";
    }

    getDetails(): Person | undefined {
        if (typeof window === "undefined") return undefined;

        // const existing = localStorage.getItem(this.storageKey);
        const existing = sessionStorage.getItem(this.storageKey);
        if (!existing) return undefined;
        return JSON.parse(existing);
    }

    setDetails(person: Person): void {
        if (typeof window === "undefined") return;
        const personText = JSON.stringify(person);
        // localStorage.setItem(this.storageKey, personText);
        sessionStorage.setItem(this.storageKey, personText);
    }
}

export default PersonManager;
