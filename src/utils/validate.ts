export class Validate {
    constructor(public errors: any[] = []) {}

    isRequired(value, message) {
        if(!value || value.length <= 0) {
            this.errors.push(message);
        }
    }

    clear() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length === 0;
    }
}