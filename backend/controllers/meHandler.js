export default function meHandler(req, res) {
    try {
        const decodedUser = req.user;
        return res.status(200).json({ user: decodedUser });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
