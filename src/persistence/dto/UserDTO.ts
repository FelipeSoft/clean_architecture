class UserDTO {
    [key: string]: any;

    constructor(data: { [key: string]: any }) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
}

export default UserDTO;
