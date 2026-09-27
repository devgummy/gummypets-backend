const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ PEGA AQUÍ TU ACCESS TOKEN (El que empieza con APP_USR- o TEST-)
const client = new MercadoPagoConfig({ 
    accessToken: 'APP_USR-3433080286588485-092617-a3721ca18d845ba1551fecdd1ddc2deb-210199662' 
});

app.post('/create_preference', async (req, res) => {
    try {
        const { title, price } = req.body;
        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: [{
                    title: title,
                    unit_price: Number(price),
                    quantity: 1,
                    currency_id: 'PEN'
                }],
                back_urls: {
                    success: "https://gummypets.vercel.app",
                    failure: "https://gummypets.vercel.app",
                },
                auto_return: "approved",
            }
        });

        res.json({ init_point: response.init_point });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor de Pagos corriendo en http://localhost:${PORT}`));