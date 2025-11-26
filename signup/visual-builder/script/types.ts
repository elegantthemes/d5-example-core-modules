interface SignupData {
    selector: string;
}

declare global {
    interface Window {
        diviModuleSignupData?: SignupData[];
    }
}

export { SignupData };
