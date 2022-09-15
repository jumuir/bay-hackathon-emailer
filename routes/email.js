const router = require('express').Router();
const { transporter } = require('../services/nodemailer');
require("dotenv").config();

let emailTimers = [];
let id = 0;

router.post('/', (req, res, next) => {
    const delay = 1 * 60 * 60000;
    const { name, email } = req.body;

    try {
        if (!name || !email) {
            throw new Error ('name and email are required in the body of the request.');
        } 
        else {
            const from = {
                name: 'Brainstation x The Bay',
                address: 'brainstationxbay@gmail.com'
            }

            const emailToSend = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Still thinking about it?</title>
                <style>
                    @import url("https://use.typekit.net/inc7dzg.css");
                    body {
                        padding: 25px;
                        background-color: white;
                        max-width: 800px;
                    }
                    * {
                        font-family: 'proxima-nova', Helvetica, sans-serif;
                        color: #222222;
                        font-weight: 400;
                        margin: 0;
                        padding: 0;
                    }
                    a {
                        text-decoration: none;
                        color: inherit;
                    }
                    .header-logo {
                        height: 24px;
                        width: 150px;
                        object-fit: contain;
                        padding: 15px 0 20px;
                    }
                    .title {
                        font-size: 24px;
                        padding-bottom: 20px;
                    }
                    .header-text {
                        font-size: 14px;
                        padding-bottom: 10px;
                    }
                    .header {
                        padding-bottom: 15px;
                    }
                    .bag-title {
                        font-size: 14px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #d8d8d8;
                    }
                    .bag-item {
                        display:-webkit-flex;
                        padding: 10px;
                        gap: 20px;
                    }
                    .bag-img {
                        height: 100%;
                        max-width: 200px;
                        margin-right: 20px;
                        width: 20%;
                        object-fit: contain;
                    }
                    .bag-right {
                        flex-grow: 1;
                    }
                    .item-title {
                        font-size: 16px;
                        font-weight: 700;
                        padding-bottom: 8px;
                    }
                    .item-desc {
                        font-size: 12px;
                    }
                    .item-final {
                        font-size: 14px;
                        color: #98242F;
                        padding: 10px 0 20px;
                    }
                    .item-btn {
                        text-align: center;
                        background-color: #222222;
                        color: white;
                        font-size: 14px;
                        line-height: 40px;
                        margin-bottom: 60px;
                        min-width: 300px;
                    }
                    .item-btn:hover {
                        background-color: #08498F;
                        cursor: pointer;
                    }
                    .wish {
                        border-bottom: 1px solid #d8d8d8;
                    }
                    .footer {
                        text-align: right;
                    }
                    .footer-text {
                        font-size: 12px;
                        padding-top: 20px;
                        padding-bottom: 10px;
                        text-align: right;
                    }
                    .footer-links {
                        width: 80%;
                        display: inline-block;
                        text-align: right;
                        margin-left: auto;
                        margin-right: 0;
                    }
                    .footer-link {
                        height: 14px;
                        padding-left: 10px;
                        object-fit: contain;
                    }
                    .footer-link--big {
                        height: 20px;
                        padding-left: 10px;
                        object-fit: contain;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <img class="header-logo" src="https://i.ibb.co/ccCTks8/main.png" alt="the bay logo" />
                    <h1 class="title">Still thinking about it?</h1>
                    <p class="header-text">Hello ${name},</p>
                    <p class="header-text">We noticed that you added one or more items to your The Bay Shopping Bag, but didn't continue to Checkout. When you're ready to buy, simply visit your cart to complete your order.</p>
                </div>
                <div class="bag">
                    <h2 class="bag-title">Shopping Bag (1)</h2>
                    <div class="bag-item">
                        <img class="bag-img" src="https://i.ibb.co/F7WpDpq/196284371841-main.jpg" alt="green dress"/>
                        <div class="bag-right">
                            <h3 class="item-title">Calvin Klein</h3>
                            <p class="item-desc">Floral Chiffon Wrap Midi Dress</p>
                            <p class="item-desc">item no: 78691296</p>
                            <p class="item-desc">Size: 2</p>
                            <p class="item-desc">Colour: Fall Green</p>
                            <p class="item-final">Final Sale</p>
                            <a href="https://localhost:3000/cart" target="_blank">
                                <p class="item-btn">Return to Shopping Bag</p>
                            </a>            
                        </div>
                    </div>
                </div>
                <div class="bag wish">
                    <h2 class="bag-title">Wish List (2)</h2>
                    <div class="bag-item">
                        <img class="bag-img" src="https://i.ibb.co/bKSCvmv/192351472152-main.jpg" alt="green dress"/>
                        <div class="bag-right">
                            <h3 class="item-title">Calvin Klein</h3>
                            <p class="item-desc">Puffed-Sleeve Sheath Dress</p>
                            <p class="item-desc">item no: 78691296</p>
                            <p class="item-desc">Size: XS</p>
                            <p class="item-desc">Colour: Black</p>            
                        </div>
                    </div>
                </div>
                <div class="bag wish">
                    <div class="bag-item">
                        <img class="bag-img" src="https://i.ibb.co/PDZvVmw/196347858920-main.jpg" alt="green dress"/>
                        <div class="bag-right">
                            <h3 class="item-title">Free People</h3>
                            <p class="item-desc">Relaxed-Fit Faux Fur Jacket</p>
                            <p class="item-desc">item no: 47655392</p>
                            <p class="item-desc">Size: XS</p>
                            <p class="item-desc">Colour: Mesa Rose</p>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <p class="footer-text">If you have any questions, please contact customer service 7am - 2am ET, 7 days a week.</p>
                    <div class="footer-links">
                        <img class="footer-link" src="https://i.ibb.co/WgNsNy5/thebay-fb.png" alt="thebay-fb"/>
                        <img class="footer-link" src="https://i.ibb.co/db1bS7D/thebay-instagram.png" alt="thebay-instagram" />
                        <img class="footer-link" src="https://i.ibb.co/R9NKfGL/thebay-twitter.png" alt="thebay-twitter" />
                        <img class="footer-link" src="https://i.ibb.co/NLwWMR5/thebay-pinterest.png" alt="thebay-pinterest" />
                        <img class="footer-link" src="https://i.ibb.co/YXgZRGK/thebay-youtube.png" alt="thebay-youtube" />
                        <img class="footer-link--big" src="https://i.ibb.co/myzLzTM/app-store.png" alt="app-store" />
                    </div>
                </div>
            </body>
            </html>`

            const emailObject = {
                from: from,
                to: `${email}`,
                subject: `Did you forget something, ${name}?`,
                text: `You left something in your shopping bag, come back and see it!`,
                html: emailToSend
            };
            
            emailHandler(id, emailObject);

            res.send({ id });
            id++;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

    
});

router.post('/:id', (req, res, next) => {
    emailHandler(id);
    res.send('email cancelled');
});

const emailHandler = (id, emailObject) => {
    if (!emailObject) {
        clearTimeout(emailTimers[{id}]);
        console.log('email cancelled')
        return;
    }

    emailTimers[{id}] = setTimeout(function(){
        transporter.sendMail(emailObject);
        console.log('email sent!')
    }, 3600000);

}


module.exports = router;