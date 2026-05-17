export default function CredRegister() {
    return (
        <form 
            className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        >

            <div className="my-2">
                <label htmlFor="email">Email AddressR</label>
                <input className="border mx-2 border-gray-500 rounded" type="email" name="email" id="email" />
            </div>

            <div className="my-2">
                <label htmlFor="password">PasswordR</label>
                <input className="border mx-2 border-gray-500 rounded" type="password" name="password" id="password" />
            </div>

            <button type="submit" className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36">
                Register
            </button>

        </form>
    )
}