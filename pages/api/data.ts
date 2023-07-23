export default function handler(req, res) {
    if (req.method === 'GET') {
        const offset = req.query.offset || 0;
        res.status(200).json({ name: 'John Doe' })
    }
}