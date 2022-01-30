import express from 'express'

const routes = express.Router()
routes.get('/healthcheck', async (req, res) => res.status(200).json({ message: "Health is OK" }))

// routes.get('/blocks', (req, res) => {
//     res.json(bc.chain);
// });

// routes.post('/mine', (req, res) => {
//     const block = bc.addBlock(req.body.data)
//     console.log(`new block added:${block.toString()}`);
//     p2pServer.syncChains();
//     res.redirect('/blocks');
// });


export default routes