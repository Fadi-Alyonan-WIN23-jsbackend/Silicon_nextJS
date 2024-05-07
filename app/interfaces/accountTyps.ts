export interface BasicInfo {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Biography: string;
}

export interface AddressInfo {
    AddressLine1: string;
    AddressLine2: string;
    PostalCode: string;
    City: string;
}

export interface Props {
    basic: BasicInfo;
    address: AddressInfo;
    errorMessage: string | null;
}
