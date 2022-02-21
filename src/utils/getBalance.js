import { Interact } from "./connect"

export const getBalance = async () => {
    const { signer } = await Interact ();
    return await signer.getBalance ();
}