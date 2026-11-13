/* Block West Client App: app logic. Settings live in config.js. */
(function () {
  "use strict";
  var C = window.APP_CONFIG;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Deal stages ---------- */
  var STAGES = {
    buyer: [
      { t: "Get pre-approved", p: "We find out your budget and get a lender letter ready so your offers are strong.", todo: "Send me your pre-approval letter, or I'll connect you with my lender." },
      { t: "Home search + showings", p: "We tour homes, compare neighborhoods and get a feel for value.", todo: "Save homes you love in Search Homes so I can see them." },
      { t: "Offer accepted", p: "You're under contract! The contract dates now set our schedule.", todo: "Watch your email for documents to sign." },
      { t: "Earnest money", p: "Your good-faith deposit goes to the title company.", todo: "Wire or deliver earnest money by the deadline. Always call title to confirm wiring instructions." },
      { t: "Inspection", p: "A licensed inspector checks the home. We decide what to ask the seller to fix.", todo: "Book your inspection and plan to be there for the last half hour." },
      { t: "Appraisal", p: "Your lender's appraiser confirms the home's value.", todo: "Nothing for you here. I'll keep you posted." },
      { t: "Loan approval", p: "Your lender finishes underwriting and gives final approval.", todo: "Answer lender requests quickly and don't open new credit or change jobs." },
      { t: "Final walk-through", p: "We check that the home is in the condition we agreed on.", todo: "Set up utilities and homeowners insurance in your name." },
      { t: "Closing day", p: "Sign, get your keys, and celebrate. Welcome home!", todo: "Bring your photo ID. I'll be there with you." },
    ],
    seller: [
      { t: "Pricing + prep", p: "We look at recent sales and make a plan to get top dollar.", todo: "Make a list of upgrades and repairs you've done." },
      { t: "Staging + photos", p: "We get the home looking its best for photos and video.", todo: "Declutter and finish small repairs before photo day." },
      { t: "Live on the market", p: "Your home is listed and showing to buyers.", todo: "Keep the home show-ready and step out for showings." },
      { t: "Offer accepted", p: "We're under contract! The contract dates now set our schedule.", todo: "Watch your email for documents to sign." },
      { t: "Inspection", p: "The buyer's inspector visits. We work through any repair requests together.", todo: "Leave utilities on and give access to attics, crawl spaces and the garage." },
      { t: "Appraisal", p: "The buyer's lender confirms the home's value.", todo: "Nothing for you here. I'll keep you posted." },
      { t: "Buyer's loan approval", p: "The buyer's lender finishes underwriting.", todo: "Start packing and book your movers." },
      { t: "Move out + walk-through", p: "The buyer checks the home before closing.", todo: "Leave the home clean, with keys, remotes and manuals." },
      { t: "Closing day", p: "Sign, hand over the keys and celebrate. Congratulations!", todo: "Bring your photo ID. I'll be there with you." },
    ],
  };

  /* ---------- Guides ---------- */
  var GUIDES = {
    buyer: [
      ["How much home can I buy?", "Your lender looks at income, debts, credit and savings. A pre-approval tells us your real budget before we fall in love with a home. Remember to plan for closing costs, usually 2–4% of the price, on top of your down payment."],
      ["How do offers work?", "I'll pull recent sales so we know what the home is worth, then we write a Colorado contract with your price, earnest money, and deadlines for inspection, appraisal and loan approval. Those deadlines protect you."],
      ["What is earnest money?", "A good-faith deposit, often 1% of the price, held by the title company and credited back to you at closing."],
      ["What happens at inspection?", "A licensed inspector checks the roof, systems, structure and more. In Colorado I also recommend a radon test and a sewer scope. Then we decide together what to ask the seller to fix or credit."],
      ["What should I avoid before closing?", "<ul><li>Don't open new credit cards or loans</li><li>Don't make big purchases (furniture can wait!)</li><li>Don't change jobs without talking to your lender</li><li>Don't move large sums of money without a paper trail</li></ul>"],
      ["What do I bring to closing?", "A photo ID and any funds you're bringing (by wire or cashier's check). <b>Always call the title company at a number you know to confirm wiring instructions.</b> Wire fraud is real, and I'll never email you changed wiring instructions."],
    ],
    seller: [
      ["How do you price my home?", "I compare your home with recent sales, active listings and what's under contract nearby. Pricing right from day one gets the most attention and the best offers."],
      ["How do I get my home ready?", "<ul><li>Declutter and depersonalize</li><li>Fix the small things: bulbs, leaky faucets, scuffs</li><li>Deep clean, windows included</li><li>Fresh mulch and a tidy front entry</li></ul>Staging and professional photos are part of my plan."],
      ["What happens during showings?", "Buyers book through the showing service and you'll get a notice. Please step out so buyers can picture themselves living there. I'll send you feedback."],
      ["How do we choose an offer?", "Price is just one piece. We look at loan type, earnest money, deadlines, inspection terms and the closing date. I'll walk you through your net proceeds for every offer."],
      ["What about the inspection?", "The buyer will usually send a list of requests. We can agree to repair, offer a credit or negotiate. I'll help you decide what's reasonable."],
      ["What happens at closing?", "You sign the deed, hand over keys and your proceeds are sent to you by the title company. Leave keys, garage remotes and appliance manuals behind for the new owners."],
    ],
    after: [
      ["Keep these papers", "Save your closing statement (you may need it for taxes), deed, title policy, warranty info and inspection report. They'll stay in your documents folder too."],
      ["Change your address", "Update USPS, your bank, your employer, your insurance and your driver's license. Colorado asks for a license update within 30 days of moving."],
      ["Property taxes", "Many lenders pay taxes from an escrow account. If yours doesn't, Larimer and Weld County taxes are due by April 30, or in two halves by Feb 28 and June 15."],
      ["Watch for scams", "You may get official-looking letters offering a copy of your deed for a fee. You don't need them. Your deed is public record and in your folder."],
      ["Homeowner's exemptions", "If you're 65+ and have owned your home 10+ years, or a qualifying veteran, ask your county about the senior or veteran property tax exemption."],
    ],
  };

  /* ---------- Seasonal home care ---------- */
  var SEASONS = {
    spring: ["Turn on sprinklers and check for broken heads", "Clean gutters and downspouts", "Check the roof and siding for hail damage", "Service the A/C or swamp cooler", "Test smoke and CO detectors", "Change the furnace filter"],
    summer: ["Water trees deeply, our dry summers are hard on them", "Check window screens and door seals", "Clean the dryer vent", "Look for cracks in the driveway and seal them", "Check the deck and re-stain if needed"],
    fall: ["Book a sprinkler blowout before the first freeze", "Disconnect and drain garden hoses", "Service the furnace", "Change the furnace filter", "Clean gutters after the leaves drop", "Test for radon (fall and winter give the best readings)"],
    winter: ["Keep the heat at 55°F or higher when you travel", "Know where your main water shut-off is", "Watch for ice dams on the roof", "Check the sump pump and window wells", "Test smoke and CO detectors", "Change the furnace filter"],
  };

  /* ---------- Client info from the personal link ---------- */
  // Personal links look like  index.html?k=<code>. setup.html builds them.
  function decode(k) {
    try {
      var s = k.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(escape(atob(s))));
    } catch (e) { return null; }
  }
  var client = null;
  var q = new URLSearchParams(location.search);
  if (q.get("k")) {
    client = decode(q.get("k"));
    if (client) { try { localStorage.setItem("bw-client", JSON.stringify(client)); } catch (e) {} }
  }
  if (!client) {
    try { client = JSON.parse(localStorage.getItem("bw-client") || "null"); } catch (e) { client = null; }
  }
  client = client || {};
  var type = client.t || "";            // buyer | seller | both | past
  var first = (client.n || "").trim();

  /* ---------- Helpers ---------- */
  var a = C.agent, L = C.links;
  var isTouch = window.matchMedia("(pointer: coarse)").matches;
  function smsLink(body) { return "sms:+1" + a.phone + "?&body=" + encodeURIComponent(body || ""); }
  function setLink(el, href, offText) {
    if (href) { el.href = href; el.classList.remove("off"); return true; }
    el.removeAttribute("href"); el.removeAttribute("target"); el.classList.add("off");
    el.addEventListener("click", function () { alert(offText || "Coming soon. Message Melissa and she'll send it to you."); });
    return false;
  }
  function parseDate(s) { if (!s) return null; var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmt(d) { return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }
  function daysUntil(d) { var t = new Date(); t.setHours(0, 0, 0, 0); return Math.round((d - t) / 86400000); }
  function ymd(d) { return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0"); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- Home ---------- */
  if (first) $("hello").textContent = "Hi, " + first;
  $("hello-sub").textContent = type === "past"
    ? "Your home, your documents, and help whenever you need it."
    : "Everything for your move, all in one place.";

  var msgBody = "Hi Melissa, it's " + (first || "") + ". ";
  $("t-msg").href = isTouch ? smsLink(msgBody) : "mailto:" + a.email + "?subject=" + encodeURIComponent("Question from " + (first || "a client"));
  $("t-msg").querySelector("span").textContent = isTouch ? "Text me anytime" : "Email me anytime";
  setLink($("t-search"), L.homeSearch);
  var hasDocs = setLink($("t-docs"), client.d, "Your documents folder isn't linked yet. Message Melissa and she'll send it.");
  if (!hasDocs) $("t-docs-sub").textContent = "Ask me for your folder link";
  setLink($("docs-btn"), client.d, "Your documents folder isn't linked yet. Message Melissa and she'll send it.");

  /* ---------- My Deal ---------- */
  var dealKind = type === "seller" ? "seller" : "buyer";
  function renderSteps(kind) {
    var list = STAGES[kind];
    var stage = kind === "seller" && type === "both" ? +client.s2 || 0 : +client.s || 0;
    if (type === "past") stage = list.length + 1;
    $("steps").innerHTML = list.map(function (s, i) {
      var n = i + 1, cls = n < stage ? "done" : n === stage ? "now" : "";
      return '<li class="' + cls + '"><span class="dot">' + (n < stage ? "✓" : n) + "</span><h3>" + esc(s.t) +
        "</h3><p>" + esc(s.p) + '</p><p class="todo"><b>Your next step:</b> ' + esc(s.todo) + "</p></li>";
    }).join("");
    return { stage: stage, total: list.length, name: stage >= 1 && stage <= list.length ? list[stage - 1].t : "" };
  }
  var info = renderSteps(dealKind);

  if (type === "both") {
    $("deal-switch").hidden = false;
    var segBtns = $("deal-switch").querySelectorAll("button");
    segBtns[0].classList.add("on");
    segBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        segBtns.forEach(function (x) { x.classList.toggle("on", x === b); });
        renderSteps(b.dataset.k);
      });
    });
  }

  if (type === "past") {
    $("deal-title").textContent = "My Home";
    $("deal-lede").textContent = "We did it! Here's a look back, plus your documents and dates.";
  } else if (!info.stage) {
    $("deal-lede").textContent = "Here's how the process works. Ask me for your personal link and you'll see exactly where your deal stands.";
  }

  if (type && type !== "past" && info.stage) {
    $("deal-card").hidden = false;
    $("deal-kind").textContent = type === "seller" ? "Your sale" : type === "both" ? "Your purchase + sale" : "Your purchase";
    $("deal-stage").textContent = "Step " + info.stage + " of " + info.total + ": " + info.name;
    $("deal-bar").style.width = Math.round((info.stage / info.total) * 100) + "%";
  }

  var close = parseDate(client.close);
  if (close) {
    var dd = daysUntil(close);
    var line;
    if (type === "past" || dd < 0) {
      var yrs = Math.floor(-dd / 365.25);
      line = "You got your keys on <strong>" + fmt(close) + "</strong>." + (yrs >= 1 ? " That's " + yrs + " year" + (yrs === 1 ? "" : "s") + " in your home!" : "");
    } else if (dd === 0) line = "<strong>Closing day is today!</strong> 🎉";
    else line = "Closing: <strong>" + fmt(close) + "</strong>. That's " + dd + " day" + (dd === 1 ? "" : "s") + " away.";
    $("close-line").innerHTML = line;
    if (!$("deal-card").hidden && dd >= 0) $("deal-countdown").innerHTML = dd === 0 ? "<strong>Closing is today!</strong>" : "<strong>" + dd + " days</strong> until closing";
  } else {
    $("close-line").innerHTML = "Once we're under contract, your closing date and deadlines show up here.";
  }

  /* Calendar buttons */
  var calHtml = "";
  if (client.c) {
    // client.c is the "Secret address in iCal format" of a Google Calendar made for this client
    var ics = client.c.trim();
    var webcal = ics.replace(/^https?:\/\//, "webcal://");
    calHtml += '<a class="btn btn-dark" target="_blank" rel="noopener" href="https://calendar.google.com/calendar/r?cid=' + encodeURIComponent(webcal) + '"><svg><use href="#i-cal"/></svg>Connect my deal calendar (Google)</a>';
    calHtml += '<a class="btn btn-line" href="' + esc(webcal) + '"><svg><use href="#i-cal"/></svg>Connect on iPhone / Outlook</a>';
    $("cal-note").textContent = "Connecting is optional. If you do, every deadline I add shows up on your own calendar automatically.";
  }
  if (close && daysUntil(close) >= 0 && type === "past") {
    var nx = new Date(close); nx.setDate(nx.getDate() + 1);
    var gUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Closing day with Melissa 🎉") +
      "&dates=" + ymd(close) + "/" + ymd(nx) + "&details=" + encodeURIComponent("Bring your photo ID. Questions? Text Melissa at " + a.phoneDisplay);
    calHtml += '<a class="btn btn-line" target="_blank" rel="noopener" href="' + gUrl + '"><svg><use href="#i-cal"/></svg>Add closing day to my calendar</a>';
  }
  /* Key dates + phone reminders */
  var DATE_NAMES = { insp: "Inspection deadline", appr: "Appraisal deadline", loan: "Loan approval deadline", walk: "Final walk-through", close: "Closing day" };
  var dts = [];
  var dtSrc = client.dt || {};
  ["insp", "appr", "loan", "walk"].forEach(function (k) { var d = parseDate(dtSrc[k]); if (d) dts.push({ k: k, d: d }); });
  if (close) dts.push({ k: "close", d: close });
  var upcoming = dts.filter(function (x) { return daysUntil(x.d) >= 0; }).sort(function (x, y) { return x.d - y.d; });
  if (upcoming.length && type !== "past") {
    $("key-dates").innerHTML = upcoming.map(function (x) {
      var n = daysUntil(x.d);
      return '<li><span>' + DATE_NAMES[x.k] + '<small>' + x.d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) + '</small></span><b>' + (n === 0 ? "Today" : n === 1 ? "Tomorrow" : n + " days") + '</b></li>';
    }).join("");
    $("key-dates").hidden = false;
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Block West Group//Client Portal//EN", "METHOD:PUBLISH"];
    upcoming.forEach(function (x) {
      var nx = new Date(x.d); nx.setDate(nx.getDate() + 1);
      lines.push("BEGIN:VEVENT", "UID:" + (client.i || "bw") + "-" + x.k + "@blockwestgroup", "DTSTAMP:" + ymd(new Date()) + "T000000Z",
        "DTSTART;VALUE=DATE:" + ymd(x.d), "DTEND;VALUE=DATE:" + ymd(nx),
        "SUMMARY:" + DATE_NAMES[x.k] + (x.k === "close" ? " 🎉" : ""),
        "DESCRIPTION:Questions? Text Melissa at " + a.phoneDisplay,
        "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Tomorrow: " + DATE_NAMES[x.k], "TRIGGER:-PT15H", "END:VALARM",
        "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Today: " + DATE_NAMES[x.k], "TRIGGER:PT8H", "END:VALARM",
        "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    var icsData = "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
    calHtml = '<a class="btn btn-dark" href="' + icsData + '" download="my-deal-dates.ics"><svg><use href="#i-bell"/></svg>Add all dates + reminders to my phone</a>' + calHtml;
    if (!$("cal-note").textContent) $("cal-note").textContent = "Your phone reminds you the day before and the morning of each date.";
  }
  $("cal-btns").innerHTML = calHtml;
  setLink($("book-btn"), L.booking, "Online booking is coming soon. Text Melissa at " + a.phoneDisplay + " to set up a time.");

  /* ---------- Guides ---------- */
  function renderGuide(g) {
    $("guide-body").innerHTML = GUIDES[g].map(function (x) {
      return "<details><summary>" + esc(x[0]) + "</summary><div>" + x[1] + "</div></details>";
    }).join("");
  }
  var gBtns = $("guide-switch").querySelectorAll("button");
  var startGuide = type === "seller" ? "seller" : type === "past" ? "after" : "buyer";
  gBtns.forEach(function (b) {
    b.classList.toggle("on", b.dataset.g === startGuide);
    b.addEventListener("click", function () {
      gBtns.forEach(function (x) { x.classList.toggle("on", x === b); });
      renderGuide(b.dataset.g);
    });
  });
  renderGuide(startGuide);
  setLink($("g-buyer-pdf"), L.buyersGuidePdf);
  setLink($("g-reloc-pdf"), L.relocationGuidePdf);

  /* ---------- Vendors ---------- */
  $("vendor-list").innerHTML = C.vendors.map(function (v) {
    var btns = "";
    if (v.phone) btns += '<a class="icon-btn" aria-label="Call ' + esc(v.name) + '" href="tel:' + esc(v.phone.replace(/[^0-9+]/g, "")) + '"><svg><use href="#i-phone"/></svg></a>';
    if (v.email) btns += '<a class="icon-btn" aria-label="Email ' + esc(v.name) + '" href="mailto:' + esc(v.email) + '"><svg><use href="#i-mail"/></svg></a>';
    if (v.website) btns += '<a class="icon-btn" aria-label="' + esc(v.name) + ' website" target="_blank" rel="noopener" href="' + esc(v.website) + '"><svg><use href="#i-link"/></svg></a>';
    if (!btns) btns = '<a class="icon-btn" aria-label="Ask Melissa for ' + esc(v.name) + '\'s contact" href="' + smsLink("Hi Melissa, can you send me " + v.name + "'s contact info?") + '"><svg><use href="#i-chat"/></svg></a>';
    return '<div class="item"><div class="meta"><span class="chip">' + esc(v.category) + "</span><b>" + esc(v.name) + "</b><span>" + esc(v.company) + "</span></div>" + btns + "</div>";
  }).join("");

  /* ---------- Home care ---------- */
  var m = new Date().getMonth();
  var nowSeason = m >= 2 && m <= 4 ? "spring" : m >= 5 && m <= 7 ? "summer" : m >= 8 && m <= 10 ? "fall" : "winter";
  var done = {};
  try { done = JSON.parse(localStorage.getItem("bw-care") || "{}"); } catch (e) {}
  var yr = new Date().getFullYear();
  function renderSeason(s) {
    $("season-list").innerHTML = SEASONS[s].map(function (t, i) {
      var key = yr + "-" + s + "-" + i;
      return '<label class="check"><input type="checkbox" data-key="' + key + '"' + (done[key] ? " checked" : "") + "><span>" + esc(t) + "</span></label>";
    }).join("");
  }
  $("season-list").addEventListener("change", function (e) {
    var k = e.target.dataset.key; if (!k) return;
    if (e.target.checked) done[k] = 1; else delete done[k];
    try { localStorage.setItem("bw-care", JSON.stringify(done)); } catch (err) {}
  });
  var sBtns = $("season-switch").querySelectorAll("button");
  sBtns.forEach(function (b) {
    b.classList.toggle("on", b.dataset.s === nowSeason);
    b.addEventListener("click", function () {
      sBtns.forEach(function (x) { x.classList.toggle("on", x === b); });
      renderSeason(b.dataset.s);
    });
  });
  renderSeason(nowSeason);

  setLink($("value-btn"), L.homeValue);
  setLink($("review-btn"), L.reviews);
  var referText = "You should talk to Melissa Patterson with Block West Group. She helped me with my home. " + a.phoneDisplay + " · " + L.website;
  $("refer-btn").addEventListener("click", function (e) {
    e.preventDefault();
    if (navigator.share) navigator.share({ title: "Melissa Patterson, Realtor", text: referText }).catch(function () {});
    else location.href = "sms:?&body=" + encodeURIComponent(referText);
  });

  /* ---------- Footer ---------- */
  $("foot").innerHTML = esc(a.name) + " · " + esc(a.team) + " · " + esc(a.brokerage) + "<br>" +
    '<a href="tel:+1' + a.phone + '">' + esc(a.phoneDisplay) + '</a> · <a href="mailto:' + esc(a.email) + '">' + esc(a.email) + "</a><br>" +
    esc(a.office) + "<br>" + esc(a.license);

  /* ---------- Add to Home Screen prompt ---------- */
  var ua = navigator.userAgent;
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var installed = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  var deferredPrompt = null;
  var forceInstall = q.get("install") === "1"; // for previews: index.html?install=1

  function openSheet() {
    $("install-ios").hidden = !!deferredPrompt;
    $("install-android").hidden = !deferredPrompt;
    document.getElementById("install").classList.add("show");
  }
  function closeSheet() {
    document.getElementById("install").classList.remove("show");
    try { localStorage.setItem("bw-install-later", String(Date.now())); } catch (e) {}
  }
  $("install-later").addEventListener("click", closeSheet);
  $("install-bg").addEventListener("click", closeSheet);
  $("install-go").addEventListener("click", function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () { deferredPrompt = null; closeSheet(); });
  });
  $("install-link").addEventListener("click", function (e) { e.preventDefault(); openSheet(); });

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); // Android/Chrome: show our own prompt instead
    deferredPrompt = e;
    $("install-link").hidden = false;
    maybeAutoOpen();
  });

  function maybeAutoOpen() {
    if (installed && !forceInstall) return;
    var last = 0;
    try { last = +localStorage.getItem("bw-install-later") || 0; } catch (e) {}
    var waited = Date.now() - last > 3 * 86400000; // ask again after 3 days
    if (forceInstall || (waited && (isIOS || deferredPrompt))) setTimeout(openSheet, 1500);
  }
  if (!installed && (isIOS || forceInstall)) $("install-link").hidden = false;
  if (isIOS || forceInstall) maybeAutoOpen();

  /* ---------- Deal update notifications (OneSignal, free) ---------- */
  var osId = C.notifications && C.notifications.oneSignalAppId;
  var canPushHere = "Notification" in window || isIOS;
  if (type && type !== "past" && canPushHere) $("updates-card").hidden = false;

  function showUpdatesOn() { $("updates-btn").hidden = true; $("updates-on").hidden = false; }

  if (isIOS && !installed) {
    // iPhone only allows notifications from the home-screen app
    $("updates-text").textContent = "Add this app to your home screen first, then turn on updates there.";
    $("updates-btn").innerHTML = '<svg><use href="#i-plus"/></svg>Add to Home Screen';
    $("updates-btn").addEventListener("click", openSheet);
  } else {
    if ("Notification" in window && Notification.permission === "granted") showUpdatesOn();
    $("updates-btn").addEventListener("click", function () {
      if (!osId || !window.OneSignalDeferred) {
        alert("Deal updates turn on once the app is live. Melissa will let you know!");
        return;
      }
      window.OneSignalDeferred.push(function (OneSignal) {
        OneSignal.Notifications.requestPermission().then(function () {
          if (OneSignal.Notifications.permission) showUpdatesOn();
        });
      });
    });
  }

  if (osId) {
    var base = location.pathname.replace(/[^/]*$/, ""); // folder the app lives in
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    var sdk = document.createElement("script");
    sdk.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    sdk.defer = true;
    document.head.appendChild(sdk);
    window.OneSignalDeferred.push(function (OneSignal) {
      return OneSignal.init({
        appId: osId,
        serviceWorkerPath: base.slice(1) + "OneSignalSDKWorker.js",
        serviceWorkerParam: { scope: base },
        notifyButton: { enable: false },
      }).then(function () {
        // Link this phone to the client so Melissa can send updates to just them
        if (client.i) OneSignal.login(client.i);
        if (type) OneSignal.User.addTag("client_type", type);
        if (OneSignal.Notifications.permission) showUpdatesOn();
      });
    });
  }

  /* ---------- Tabs ---------- */
  var pages = ["home", "deal", "guides", "vendors", "home-care"];
  function route() {
    var h = (location.hash || "#home").slice(1);
    var page = h === "deal-dates" ? "deal" : pages.indexOf(h) >= 0 ? h : "home";
    document.querySelectorAll("section[data-page]").forEach(function (s) { s.classList.toggle("on", s.dataset.page === page); });
    document.querySelectorAll("nav.tabs a").forEach(function (t) { t.classList.toggle("on", t.dataset.tab === page); });
    if (h === "deal-dates") $("deal-dates").scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
