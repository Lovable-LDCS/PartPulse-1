# PartPulse - GitHub Pages Access URLs

## 🌐 Primary URL

Your PartPulse app is deployed and accessible at:

```
https://lovable-ldcs.github.io/PartPulse-1/
```

## 📍 Direct Links to Key Pages

### Main Application Pages
- **Home/Landing Page**: https://lovable-ldcs.github.io/PartPulse-1/
- **Internal Transfer Form**: https://lovable-ldcs.github.io/PartPulse-1/internal-transfer
- **Warranty Claims Form**: https://lovable-ldcs.github.io/PartPulse-1/warranty-claims

### Admin Pages (Requires Admin Login)
- **Invite New Members**: https://lovable-ldcs.github.io/PartPulse-1/invite
- **Reports Dashboard**: https://lovable-ldcs.github.io/PartPulse-1/reports
- **Settings**: https://lovable-ldcs.github.io/PartPulse-1/settings
- **Security Dashboard**: https://lovable-ldcs.github.io/PartPulse-1/security
- **Health Checker**: https://lovable-ldcs.github.io/PartPulse-1/health

## ✅ How to Verify Deployment

### 1. Check Deployment Status
1. Go to: https://github.com/Lovable-LDCS/PartPulse-1/actions
2. Look for the latest "Deploy to GitHub Pages" workflow
3. Ensure it shows a green checkmark (✓) indicating success
4. Click on the workflow run to see details

### 2. Verify GitHub Pages Settings
1. Go to: https://github.com/Lovable-LDCS/PartPulse-1/settings/pages
2. Confirm:
   - **Source**: GitHub Actions
   - **Custom domain**: (none, unless you configured one)
   - You should see: "Your site is live at https://lovable-ldcs.github.io/PartPulse-1/"

### 3. Test the Application
Visit the main URL and verify:
- ✅ Page loads without errors
- ✅ Logo displays correctly
- ✅ Navigation menu works
- ✅ Forms are accessible
- ✅ Role switching works (if applicable)
- ✅ No console errors (press F12 to check browser console)

## 🔍 Troubleshooting

### If you see a 404 error:
1. **Wait 2-3 minutes** - GitHub Pages deployment takes time after the workflow completes
2. **Check workflow status** - Ensure the deploy workflow succeeded
3. **Verify GitHub Pages is enabled** - Check Settings → Pages → Source is "GitHub Actions"
4. **Hard refresh** - Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
5. **Check basePath** - Ensure `next.config.js` has `basePath: '/PartPulse-1'`

### If assets are missing (broken images, no styles):
1. Check that `assetPrefix` is set correctly in `next.config.js`
2. Ensure `.nojekyll` file exists in the deployment
3. Hard refresh your browser cache

### If forms don't work:
This is expected for a static GitHub Pages deployment. The app requires:
- **Supabase** for database operations (user data, submissions)
- **Resend API** for sending emails

For full functionality, you need to configure these services or deploy to a platform that supports server-side operations.

## 📊 Monitoring

### Check Recent Deployments
- **Actions Tab**: https://github.com/Lovable-LDCS/PartPulse-1/actions
- **Deployments**: https://github.com/Lovable-LDCS/PartPulse-1/deployments

### View Latest Commit
- Check what version is currently deployed by viewing the latest commit on the `main` branch
- **Commits**: https://github.com/Lovable-LDCS/PartPulse-1/commits/main

## 🚀 Triggering a New Deployment

If you need to redeploy:

### Option 1: Push to Main
```bash
git push origin main
```

### Option 2: Manual Trigger
1. Go to: https://github.com/Lovable-LDCS/PartPulse-1/actions/workflows/deploy.yml
2. Click "Run workflow"
3. Select branch: `main`
4. Click "Run workflow"

## 📱 Sharing the URL

Share this URL with your team to access the app:
```
https://lovable-ldcs.github.io/PartPulse-1/
```

**Note**: Ensure users have the necessary permissions/credentials for:
- Admin access (specific email addresses configured as admins)
- Supabase authentication (if configured)

## 🔐 Admin Access

Default admin emails (configured in the system):
- joline.kruger@tranetechnologies.com
- johan.ras2@outlook.com

These users have access to all admin features including:
- Invite new members
- View reports
- Manage settings
- Security dashboard
- Health checker

## 📞 Support

For deployment or access issues:
- **GitHub Issues**: https://github.com/Lovable-LDCS/PartPulse-1/issues
- **Email**: joline.kruger@tranetechnologies.com or johan.ras2@outlook.com

---

**Last Updated**: 2025-11-19
**Repository**: https://github.com/Lovable-LDCS/PartPulse-1
**Deployment Method**: GitHub Actions + GitHub Pages
