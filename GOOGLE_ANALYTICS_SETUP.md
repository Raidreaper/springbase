# 📊 Google Analytics Setup Guide for Springbase Schools

## ✅ **Google Analytics Successfully Integrated!**

Your Google Analytics tracking code has been properly integrated into your Springbase Schools website.

---

## 🔧 **What's Been Implemented**

### **1. Global Google Analytics Tracking**
- ✅ **Google Tag (gtag.js)** added to `index.html`
- ✅ **Tracking ID**: `G-TXJ86GPW1L`
- ✅ **Global page tracking** for all pages
- ✅ **Asynchronous loading** for optimal performance

### **2. Enhanced Page Tracking**
- ✅ **Dynamic page tracking** in SEO component
- ✅ **Custom page titles** and URLs for each page
- ✅ **Automatic page view tracking** on route changes

---

## 📋 **Implementation Details**

### **Global Tracking Code (in index.html)**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TXJ86GPW1L"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TXJ86GPW1L');
</script>
```

### **Page-Specific Tracking (in SEO component)**
- Automatically tracks page views for each route
- Sends custom page titles and URLs
- Works with React Router navigation

---

## 🎯 **What You Can Track**

### **Basic Metrics**
- **Page Views** - Total visits to each page
- **Sessions** - User visits to your website
- **Users** - Unique visitors
- **Bounce Rate** - Single-page sessions
- **Session Duration** - Time spent on site

### **Advanced Metrics**
- **Traffic Sources** - Where visitors come from
- **Device Types** - Mobile, desktop, tablet usage
- **Geographic Data** - Visitor locations
- **Page Performance** - Loading times and user experience

### **Custom Events (Ready to Implement)**
- **Contact Form Submissions**
- **Schedule Tour Requests**
- **Admission Inquiries**
- **Image Modal Views**
- **Carousel Interactions**

---

## 📈 **Setting Up Goals & Conversions**

### **1. Contact Form Goal**
1. Go to Google Analytics → Admin → Goals
2. Create new goal: "Contact Form Submission"
3. Set up conversion tracking for contact form

### **2. Schedule Tour Goal**
1. Create goal: "Schedule Tour Request"
2. Track when users complete tour scheduling

### **3. Admission Inquiry Goal**
1. Create goal: "Admission Inquiry"
2. Track admission-related page visits and form submissions

---

## 🔍 **Verification Steps**

### **1. Real-Time Tracking**
1. Deploy your website to Vercel
2. Visit your website in a new browser tab
3. Go to Google Analytics → Real-time → Overview
4. You should see active users and page views

### **2. Page View Testing**
1. Navigate through different pages on your website
2. Check Real-time → Pages to see page views
3. Verify that page titles are being tracked correctly

### **3. Device & Location Testing**
1. Test from different devices (mobile, desktop)
2. Check Real-time → Locations
3. Verify geographic data is being collected

---

## 📊 **Key Reports to Monitor**

### **1. Audience Overview**
- **Users** - Total unique visitors
- **Sessions** - Total visits
- **Page Views** - Total page loads
- **Bounce Rate** - Single-page sessions percentage
- **Session Duration** - Average time on site

### **2. Acquisition Reports**
- **Traffic Sources** - Organic search, direct, social, referral
- **Google Ads** - If you run paid campaigns
- **Social Media** - Traffic from social platforms

### **3. Behavior Reports**
- **Site Content** - Most popular pages
- **Landing Pages** - Entry points to your site
- **Exit Pages** - Where users leave your site

### **4. Real-Time Reports**
- **Active Users** - Currently on your site
- **Page Views** - Live page view tracking
- **Traffic Sources** - Current traffic sources

---

## 🎯 **Custom Events Setup (Optional)**

### **Contact Form Tracking**
```javascript
// Add this to your contact form submission handler
gtag('event', 'form_submit', {
  event_category: 'engagement',
  event_label: 'contact_form'
});
```

### **Schedule Tour Tracking**
```javascript
// Add this to your schedule tour form submission
gtag('event', 'form_submit', {
  event_category: 'engagement',
  event_label: 'schedule_tour'
});
```

### **Image Modal Tracking**
```javascript
// Add this to your image modal open handler
gtag('event', 'image_view', {
  event_category: 'engagement',
  event_label: 'image_modal'
});
```

---

## 📱 **Mobile App Analytics (Future)**

If you plan to create a mobile app, you can use the same Google Analytics property to track:
- App downloads
- In-app events
- User engagement
- Conversion funnels

---

## 🔒 **Privacy & Compliance**

### **GDPR Compliance**
- Google Analytics 4 is GDPR compliant
- Data is processed according to Google's privacy policy
- Users can opt-out using browser settings

### **Data Retention**
- Default data retention: 14 months
- Can be extended to 38 months
- Data is automatically deleted after retention period

---

## 📞 **Support & Troubleshooting**

### **Common Issues**
1. **No data showing** - Wait 24-48 hours for initial data
2. **Incorrect page titles** - Check SEO component implementation
3. **Missing events** - Verify gtag function is available

### **Google Analytics Help**
- [Google Analytics Help Center](https://support.google.com/analytics)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Google Tag Manager](https://tagmanager.google.com) for advanced tracking

---

## 🎉 **Next Steps**

### **1. Deploy and Test**
1. Deploy your website to Vercel
2. Test tracking in real-time
3. Verify all pages are being tracked

### **2. Set Up Goals**
1. Create conversion goals
2. Set up custom events
3. Monitor goal completions

### **3. Regular Monitoring**
1. Check analytics weekly
2. Monitor traffic trends
3. Optimize based on data

---

## 📊 **Expected Results Timeline**

### **Week 1-2:**
- Initial data collection
- Basic metrics available
- Real-time tracking working

### **Month 1:**
- Historical data trends
- Traffic source analysis
- User behavior insights

### **Month 3+:**
- Conversion optimization
- Content performance analysis
- ROI measurement

---

**Your Google Analytics is now fully integrated and ready to track your website's performance!** 🎉

*Tracking ID: G-TXJ86GPW1L*
*Last updated: January 6, 2025*
