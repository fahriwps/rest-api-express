export interface ITransaction {
    id: number;
    from: string
    recipient: string;
    amount: number;
    description: string;
}