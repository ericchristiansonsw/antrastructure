# Antfrastructure Website

A custom-built website exploring the future of technology through nature's infrastructure - specifically, the vast underground networks created by ant colonies.

## 🎨 Design Philosophy

This website combines futuristic sci-fi aesthetics with organic, nature-inspired elements to represent the fusion of cutting-edge technology with billions of years of natural evolution.

**Features:**
- Animated network visualizations
- Responsive design (mobile-friendly)
- Interactive elements and hover effects
- Blog section for research articles
- Team profiles
- Contact form
- Full navigation across all pages

## 📁 Website Structure

```
antfrastructure/
├── index.html          # Homepage with hero section and network visualization
├── vision.html         # About/Vision page explaining the concept
├── technology.html     # Technology details and process
├── blog.html          # Blog/research articles
├── team.html          # Team member profiles
├── contact.html       # Contact form and information
├── styles.css         # All styling and animations
├── script.js          # JavaScript for interactivity and visualizations
└── README.md          # This file
```

## 🚀 Deploying to Netlify

### Method 1: Drag & Drop (Easiest)

1. **Go to Netlify**: Visit [netlify.com](https://netlify.com) and sign up/login
2. **Drag and Drop**: Go to the "Sites" tab and drag your entire website folder into the drag-and-drop area
3. **Done!** Your site is live at a random Netlify URL

### Method 2: GitHub (Recommended for Updates)

1. **Create a GitHub account** if you don't have one at [github.com](https://github.com)

2. **Create a new repository:**
   - Click "New repository"
   - Name it "antfrastructure"
   - Make it public
   - Don't add README, .gitignore, or license

3. **Upload your files:**
   - Click "uploading an existing file"
   - Drag all your website files into the upload area
   - Commit the changes

4. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   - Click "Deploy site"

5. **Your site is now live!** Netlify will give you a URL

### Method 3: Netlify CLI (For Advanced Users)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your website folder
cd /path/to/your/website
netlify deploy

# For production deployment
netlify deploy --prod
```

## 🌐 Connecting Your Domain

Since you bought your domain through Squarespace:

1. **In Netlify:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain name (e.g., antfrastructure.com)
   - Netlify will give you DNS records to add

2. **In Squarespace:**
   - Go to Settings → Domains
   - Click your domain
   - Go to Advanced Settings → Custom DNS
   - Add the DNS records provided by Netlify:
     - Add an A record pointing to Netlify's IP
     - Or add a CNAME record (check Netlify's instructions)

3. **Wait for propagation** (can take 24-48 hours, but usually much faster)

## 🎨 Customization Tips

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --color-cyber-green: #00ff9f;  /* Change this to your preferred accent color */
    --color-dark-bg: #0a0e0d;      /* Change background color */
}
```

### Adding Your Team Photos
Replace the 👤 emoji in `team.html` with actual images:
```html
<!-- Replace this: -->
<div class="team-avatar">👤</div>

<!-- With this: -->
<div class="team-avatar">
    <img src="your-photo.jpg" alt="Your Name">
</div>
```

### Adding Images
You can add images to the blog, vision, or any page by creating an `images` folder and referencing them:
```html
<img src="images/your-image.jpg" alt="Description">
```

### Updating Content
- **Team members**: Edit the team cards in `team.html`
- **Blog posts**: Edit the blog cards in `blog.html`
- **Contact email**: Update in `contact.html`
- **Social links**: Update the href="#" attributes in the footer

## 🔧 Technical Details

**Technologies Used:**
- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (no dependencies!)
- Custom Canvas-based network visualizations
- Google Fonts (Orbitron & Syne)

**Browser Support:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📧 Form Functionality

The contact form currently simulates submission (shows success message but doesn't actually send emails). To make it functional:

**Option 1: Use Netlify Forms (Easiest)**
Add `netlify` attribute to the form tag in `contact.html`:
```html
<form class="contact-form" id="contactForm" netlify>
```

**Option 2: Use a service like Formspree**
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update the form action in `contact.html`

## 🐛 Troubleshooting

**Network visualizations not showing?**
- Make sure JavaScript is enabled
- Check browser console for errors
- Try a different browser

**Site not loading after deployment?**
- Wait a few minutes (initial deployment can take time)
- Clear your browser cache
- Check Netlify deploy logs for errors

**Domain not working?**
- DNS changes can take up to 48 hours
- Verify DNS records are correct in Squarespace
- Use [whatsmydns.net](https://whatsmydns.net) to check propagation

## 📝 License

This is a custom website created for the Antfrastructure project. Feel free to modify and use as needed!

## 🙋 Need Help?

If you run into any issues:
1. Check the [Netlify documentation](https://docs.netlify.com)
2. Verify all files are uploaded correctly
3. Check browser console for JavaScript errors
4. Make sure all file names match (case-sensitive!)

---

Built with 🐜 by the Antfrastructure team
