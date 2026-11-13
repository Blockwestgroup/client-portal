/*
  Block West Client App: settings
  ---------------------------------
  This is the only file you need to edit for links, contact info and vendors.
  Anything marked TODO is still blank and shows as "coming soon" in the app.
*/
window.APP_CONFIG = {
  agent: {
    name: "Melissa Patterson",
    team: "Block West Group",
    brokerage: "eXp Realty",
    phone: "9706901339",               // used for Call + Text buttons
    phoneDisplay: "(970) 690-1339",
    email: "melissa@blockwestgroup.com",
    office: "2261 E Drake Rd, Ste #135, Fort Collins, CO",
    license: "CO License 100096057",
  },

  links: {
    // Home search on your Lofty site. When clients register there, Lofty shows you
    // what they view and save.
    homeSearch: "https://blockwestgroup.com/listing",
    booking: "https://calendly.com/melissapattersonre",
    reviews: "https://www.zillow.com/profile/melissapatterson1339",
    homeValue: "https://links.blockwestgroup.com/seller-consultation.html",
    buyersGuidePdf: "https://links.blockwestgroup.com/guides/home-buyers-guide.pdf",
    relocationGuidePdf: "https://links.blockwestgroup.com/guides/northern-colorado-relocation-guide.pdf",
    website: "https://blockwestgroup.com",
  },

  // Deal update notifications. Free OneSignal account: paste its App ID here
  // once the app is online (OneSignal → Settings → Keys & IDs).
  notifications: {
    oneSignalAppId: "", // TODO after the app is live on GitHub Pages
  },

  // Your trusted vendors, from the Home Buyer's Guide ("Meet the Team" and
  // "Recommended Resources" pages). Leave phone/email/website blank if you don't have it yet.
  vendors: [
    { category: "Lender", name: "Lauren Lendrum", company: "CrossCountry Mortgage", phone: "970-545-0815", email: "lauren.juhl@ccm.com", website: "" },
    { category: "Home Inspector", name: "Brent Fletcher", company: "Fletcher Home Inspections", phone: "970-691-1444", email: "brent@fletcherhomeinspections.com", website: "" },
    { category: "Title & Closing", name: "Nikki Schaefer", company: "Chicago Title", phone: "970-666-7302", email: "nikki.schaefer@ctt.com", website: "" },
    { category: "Insurance", name: "Kiley Raffaeli", company: "", phone: "308-380-1196", email: "", website: "" },
    { category: "Surveyor", name: "Eagle Eye Surveying", company: "", phone: "970-744-8238", email: "", website: "" },
    { category: "General Contractor", name: "Jorge", company: "Legacy Interiors", phone: "970-518-8649", email: "", website: "" },
    { category: "Flooring", name: "Jorge", company: "Legacy Interiors", phone: "970-518-8649", email: "", website: "" },
    { category: "Electrician", name: "Derrick Meis", company: "", phone: "970-381-8675", email: "", website: "" },
    { category: "Plumbing", name: "Jacob Smyth", company: "Peak Plumbing and Services", phone: "970-673-6025", email: "", website: "" },
    { category: "Handyman", name: "Jesse Williams", company: "Small repairs", phone: "603-670-5023", email: "", website: "" },
    { category: "Painting", name: "Ben and Stef Scotts Painting", company: "", phone: "970-567-1963", email: "", website: "" },
    { category: "House Cleaning", name: "Kerry Jackson", company: "", phone: "970-227-1472", email: "", website: "" },
    { category: "Fencing", name: "Josh Burch", company: "JC Property Care", phone: "970-978-3544", email: "", website: "" },
    { category: "Landscaping", name: "Alpine Gardens", company: "", phone: "970-226-2296", email: "", website: "" },
    // From Melissa's vendor notes
    { category: "Contractor", name: "Uriel Corral", company: "Larger projects", phone: "970-366-8617", email: "", website: "" },
    { category: "Contractor", name: "Aldo Corral", company: "Larger projects", phone: "970-366-8617", email: "", website: "" },
    { category: "Staging & Photos", name: "Jena Stack", company: "Sell It Staged", phone: "303-710-6635", email: "", website: "" },
  ],
};
