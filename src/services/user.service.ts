import getConnection from "../config/database";

const handleCreateUser = async (
    name: string,
    email: string,
    address: string
) => {
    //  connect database
    const connection = await getConnection();
    // insert user vao database
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [name, email, address];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const getAllUsers = async () => {
    const connection = await getConnection();
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { handleCreateUser, getAllUsers };