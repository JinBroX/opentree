# OpenTree — Eastern Ritual Wellness

A clean, responsive e-commerce website for the **OpenTree** spiritual wellness brand.

## Stack
- Pure HTML5 / CSS3 / Vanilla JavaScript
- No build tools required — deploy as static files
- Cart state stored in `localStorage`
- Payment UI ready for Stripe / PayPal integration

## Pages
| Page | File |
|------|------|
| Home | `index.html` |
| Shop | `shop.html` |
| About | `about.html` |
| Contact | `contact.html` |
| Checkout | `checkout.html` |

## Deploy to Server

```bash
# 1. SSH into your Tencent Cloud server
ssh root@YOUR_SERVER_IP

# 2. Install Nginx & Git
apt update && apt install -y nginx git

# 3. Clone the repo
git clone https://github.com/JinBroX/opentree.git /var/www/opentree

# 4. Copy Nginx config
cp /var/www/opentree/nginx.conf /etc/nginx/sites-available/opentree
ln -s /etc/nginx/sites-available/opentree /etc/nginx/sites-enabled/opentree
nginx -t && systemctl reload nginx

# 5. (Optional) Enable HTTPS with Let's Encrypt
apt install -y certbot python3-certbot-nginx
certbot --nginx -d opentree.cc -d www.opentree.cc
```

## Future Updates — Pull & Reload
```bash
bash /var/www/opentree/deploy.sh
```

## Brand
- **Domain**: opentree.cc
- **Tagline**: Eastern Ritual Wellness
- **Colors**: Deep black `#0e0d0b`, Gold `#c9a96e`
