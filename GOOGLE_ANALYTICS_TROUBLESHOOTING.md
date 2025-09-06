# 🔧 Google Analytics Troubleshooting Guide

## ⚠️ **Issue: Data Collection Not Active**

Your Google Analytics is showing "Data collection isn't active" which means the tracking code needs to be properly deployed and tested.

---

## 🚨 **Immediate Steps to Fix**

### **1. Deploy to Vercel First**
The tracking code is only active on the live domain `https://www.springbase.com.ng`. You need to:

1. **Push to GitHub:**
```bash
git add .
git commit -m "Add Google Analytics tracking code"
git push origin main
```

2. **Deploy to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Deploy with default settings
   - Add custom domain `springbase.com.ng`

### **2. Verify Domain Configuration**
Make sure your Vercel project is configured with:
- **Primary Domain**: `springbase.com.ng`
- **WWW Domain**: `www.springbase.com.ng`
- **HTTPS**: Enabled (Vercel handles this automatically)

---

## 🔍 **Testing Steps After Deployment**

### **1. Real-Time Testing**
1. **Deploy your website to Vercel**
2. **Visit** `https://www.springbase.com.ng` in a new browser tab
3. **Go to Google Analytics** → Real-time → Overview
4. **You should see** active users and page views within 5-10 minutes

### **2. Page View Testing**
1. **Navigate through different pages** on your live website
2. **Check Real-time** → Pages to see page views
3. **Verify page titles** are being tracked correctly

### **3. Browser Developer Tools Testing**
1. **Open Developer Tools** (F12)
2. **Go to Console tab**
3. **Look for** `gtag` function calls
4. **Check Network tab** for requests to `googletagmanager.com`

---

## 🛠️ **Common Issues & Solutions**

### **Issue 1: Tracking Code Not Loading**
**Symptoms:** No data in Google Analytics after 48 hours
**Solution:**
```html
<!-- Make sure this is in your index.html head section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TXJ86GPW1L"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TXJ86GPW1L');
</script>
```

### **Issue 2: Wrong Domain Configuration**
**Symptoms:** Data shows for wrong domain
**Solution:**
1. **In Google Analytics** → Admin → Data Streams
2. **Click on your stream** (Springbase)
3. **Update Stream URL** to `https://www.springbase.com.ng`
4. **Save changes**

### **Issue 3: HTTPS/HTTP Mismatch**
**Symptoms:** Tracking not working due to security issues
**Solution:**
- **Ensure your domain uses HTTPS** (Vercel handles this)
- **Update Google Analytics** to use `https://www.springbase.com.ng`
- **Never use HTTP** for production

### **Issue 4: Ad Blockers**
**Symptoms:** Tracking works for some users but not others
**Solution:**
- **Test in incognito mode** (disables most ad blockers)
- **Test from different devices** and networks
- **Consider server-side tracking** for more reliable data

---

## 📊 **Verification Checklist**

### **✅ Pre-Deployment Checklist**
- [ ] Google Analytics code added to `index.html`
- [ ] Tracking ID `G-TXJ86GPW1L` is correct
- [ ] Code is in the `<head>` section
- [ ] No syntax errors in the code

### **✅ Post-Deployment Checklist**
- [ ] Website deployed to Vercel
- [ ] Custom domain `springbase.com.ng` is active
- [ ] HTTPS is working
- [ ] Website loads without errors
- [ ] All pages are accessible

### **✅ Google Analytics Checklist**
- [ ] Stream URL is `https://www.springbase.com.ng`
- [ ] Measurement ID is `G-TXJ86GPW1L`
- [ ] Enhanced measurement is enabled
- [ ] Real-time data is showing
- [ ] Page views are being tracked

---

## 🔧 **Advanced Troubleshooting**

### **1. Check Google Tag Assistant**
1. **Install Google Tag Assistant** Chrome extension
2. **Visit your live website**
3. **Click the extension** to see if tags are firing
4. **Look for** `gtag` events in the console

### **2. Test with Google Analytics Debugger**
1. **Install GA Debugger** Chrome extension
2. **Enable debug mode**
3. **Visit your website**
4. **Check console** for detailed tracking information

### **3. Verify in Google Analytics**
1. **Go to Admin** → Data Streams
2. **Click on your stream**
3. **Click "View tag instructions"**
4. **Verify the code matches** what's on your website

---

## 📱 **Mobile Testing**

### **Test on Mobile Devices**
1. **Visit your website** on mobile
2. **Check Google Analytics** Real-time reports
3. **Verify mobile traffic** is being tracked
4. **Test different mobile browsers**

---

## 🎯 **Expected Timeline**

### **Immediate (0-5 minutes)**
- Real-time data should appear
- Page views should be tracked
- User sessions should show

### **24-48 Hours**
- Historical data available
- Traffic sources populated
- Device and location data

### **1 Week**
- Complete analytics data
- User behavior insights
- Conversion tracking

---

## 🚀 **Quick Fix Commands**

### **If you need to redeploy:**
```bash
# Stop any running processes
# Then run:
git add .
git commit -m "Fix Google Analytics tracking"
git push origin main
```

### **If you need to test locally:**
```bash
npm run dev
# Visit http://localhost:3000
# Check browser console for gtag calls
```

---

## 📞 **Support Resources**

### **Google Analytics Help**
- [Google Analytics Help Center](https://support.google.com/analytics)
- [Google Tag Assistant](https://tagassistant.google.com/)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)

### **Vercel Support**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

---

## 🎉 **Success Indicators**

You'll know it's working when you see:
- ✅ **Real-time users** in Google Analytics
- ✅ **Page views** being tracked
- ✅ **Traffic sources** showing data
- ✅ **Device types** being recorded
- ✅ **Geographic data** for Lagos, Nigeria

---

## ⚡ **Next Steps**

1. **Deploy to Vercel** with your custom domain
2. **Test the live website** for tracking
3. **Verify in Google Analytics** Real-time reports
4. **Set up conversion goals** for contact forms
5. **Monitor daily** for the first week

**The key is getting your website live on `https://www.springbase.com.ng` first!** 🚀
