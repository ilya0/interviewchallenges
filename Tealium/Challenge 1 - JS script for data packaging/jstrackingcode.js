(function() {
    // Find the carousel arrow elements on the homepage
    const carouselArrows = document.querySelectorAll('.slideshow-prev,.slideshow-next');

    // This function will be called when an arrow is clicked
    function carouClik(event) {
        // Check which arrow was clicked
        const direction = event.currentTarget.classList.contains('slideshow-next')? 'right' : 'left';

        // Prepare the data to send to Tealium
        const senddata = {
            "tealium_event": "sce_dev_test",
            "candidate_email": "ilya@tealium.com", 
            "carousel_direction": direction,
            "carousel_type": "homepage-hero" // Added this to be clear
        };

        // Send the event to Tealium 
        if (window.utag && window.utag.link) {
            utag.link(senddata);
            console.log("Tealium event sent (Carousel):", senddata);
        } else {
            console.error("Tealium is not available on this page.");
        }
    }

    
    if (carouselArrows.length > 0) {
        carouselArrows.forEach(function(arrow) {
            arrow.addEventListener('click', carouClik); // Attach the click listener to each arrow button 
        });
    } else {
        console.warn("(.slideshow-prev,.slideshow-next) not found.");
    }
})();



/* data send 
{
  "tealium_event": "sce_dev_test",
  "candidate_email": "YOUR_EMAIL@example.com",
  "carousel_direction": "right", // This will be "left" or "right" based on the click
  "carousel_type": "homepage-hero"
}


// fetch obj

{
    "tealium_event": "sce_dev_test",
    "candidate_email": "iosovets+teatest@gmail.com",
    "carousel_direction": "right",
    "carousel_type": "homepage-hero",
    "cp.utag_main_vsplit": "a",
    "cp.utag_main_v_id": "019a3c4d9b90001f4e32b67756e204075002206d00fb8",
    "cp.utag_main__sn": "3",
    "cp.utag_main_ses_id": "1762193809698",
    "cp.utag_main_dc_visit": "3",
    "cp.utag_main__ss": "0",
    "cp.utag_main_qm_replay_sent": "1762193809698",
    "cp.utag_main_dc_region": "us-east-1",
    "cp.utag_main_ttd_uuid": "ee8f3495-4015-4185-912f-e5d57755818a",
    "cp.utag_main_cms_5603": "1",
    "cp.utag_main__pn": "11",
    "cp.utag_main__se": "30",
    "cp.utag_main__st": "1762197599167",
    "cp.utag_main__prevpage": "undefined",
    "cp.utag_main_dc_event": "39",
    "cp.geo_city": "Arcola",
    "cp.geo_country": "US",
    "cp.s_fid": "6800FEBEC3F30E74-3D7868A072444310",
    "cp.s_cc": "true",
    "cp.CONSENTMGR": "consent:true|ts:1762183974556",
    "cp._gcl_au": "1.1.1266247770.1762184580",
    "cp._gid": "GA1.2.1892010465.1762184580",
    "cp.ajs_anonymous_id": "0e192f5c-cce5-4d05-9601-28db99e70cb4",
    "cp.QuantumMetricUserID": "7e37cf9a9169df11cb0da42ac824838b",
    "cp._fbp": "fb.1.1762184604218.54067723701956395",
    "cp.QuantumMetricSessionID": "6ad0b454fb6194417ac0a3404cc8bf7b",
    "cp.external_no_cache": "1",
    "cp.AWSALBTG": "gTmm170V6X2i29ZqhmgRRL9ueNHo3SkAIoodar5fDQGUPMRMArGZ2wyUjCfkbXC5yNBz+3uM52nXGAweB4Z2lRpXvlrGd3Wk/E96oVsfjM3HmWrCBJMchdY+5FZfqbvEkixBglG3ZaAy6CZBjE6vpwPplFZonvo0wW+PtuJRhgJWYm939Xo=",
    "cp.AWSALBTGCORS": "gTmm170V6X2i29ZqhmgRRL9ueNHo3SkAIoodar5fDQGUPMRMArGZ2wyUjCfkbXC5yNBz+3uM52nXGAweB4Z2lRpXvlrGd3Wk/E96oVsfjM3HmWrCBJMchdY+5FZfqbvEkixBglG3ZaAy6CZBjE6vpwPplFZonvo0wW+PtuJRhgJWYm939Xo=",
    "cp.AWSALB": "A00e3j1wdBDggQGnR+K/47tu8Hn8+i91XDGOaDbsTnZbU+4moyYttL5P3GpbI+cie/JA+uo9FoxXFuRvLGZJM9M1hY0z7APnkvlq9zO7rNzrGkjxY5clLyYP9c0s",
    "cp.AWSALBCORS": "A00e3j1wdBDggQGnR+K/47tu8Hn8+i91XDGOaDbsTnZbU+4moyYttL5P3GpbI+cie/JA+uo9FoxXFuRvLGZJM9M1hY0z7APnkvlq9zO7rNzrGkjxY5clLyYP9c0s",
    "cp._ga_54TR4THETV": "GS2.1.s1762193810$o2$g1$t1762195771$j10$l0$h0",
    "cp._ga": "GA1.1.1204567686.1762184580",
    "cp.cto_bundle": "xRhXJF9WQ3YxaDhnWWs0TWZVR09MTzB0NDRBb0dvS2IzazJVSzk3WjlSN0RkNE5yMVJHOUEweDNpQkVHZlFtREt1SlRScGVLdGdZeGI4TVdISWIlMkJkZkFCJTJGcXBwaHY2QWRlNTlzZDAzZ0szcnpQMjBxNmVoeGp6dUpFUU8xZW5FTHh0QjVPa2F0QVJIT3VwNHlFTWRkeE50YjR3JTNEJTNE",
    "meta.description": "Default Description",
    "meta.keywords": "Magento, Varien, E-commerce",
    "meta.robots": "NOINDEX,NOFOLLOW",
    "meta.viewport": "initial-scale=1.0, width=device-width",
    "dom.referrer": "https://docs.google.com/",
    "dom.title": "Tealium Ecommerce Demo",
    "dom.domain": "ecommerce.tealiumdemo.com",
    "dom.query_string": "",
    "dom.hash": "",
    "dom.url": "https://ecommerce.tealiumdemo.com/",
    "dom.pathname": "/",
    "dom.viewport_height": 1294,
    "dom.viewport_width": 1005,
    "ut.domain": "tealiumdemo.com",
    "ut.version": "ut4.51.202511031539",
    "ut.event": "link",
    "ut.visitor_id": "019a3c4d9b90001f4e32b67756e204075002206d00fb8",
    "ut.session_id": "1762193809698",
    "ut.account": "tealiumlabs",
    "ut.profile": "retail-21",
    "ut.env": "prod",
    "tealium_visitor_id": "019a3c4d9b90001f4e32b67756e204075002206d00fb8",
    "tealium_session_id": "1762193809698",
    "tealium_session_number": "3",
    "tealium_session_event_number": "30",
    "tealium_datasource": "07crko",
    "tealium_account": "tealiumlabs",
    "tealium_profile": "retail-21",
    "tealium_environment": "prod",
    "tealium_random": "7850153046468716",
    "tealium_library_name": "utag.js",
    "tealium_library_version": "4.51.0",
    "tealium_timestamp_epoch": 1762195799,
    "tealium_timestamp_utc": "2025-11-03T18:49:59.170Z",
    "tealium_timestamp_local": "2025-11-03T13:49:59.170",
    "va.metrics.16": 2,
    "va.metrics.21": 2,
    "va.metrics.22": 43,
    "va.metrics.25": 1.91385,
    "va.metrics.26": 1.91385,
    "va.metrics.28": 1,
    "va.metrics.29": 2,
    "va.metrics.5181": 1.9052833333333334,
    "va.metrics.6397": 0,
    "va.metrics.6399": 0.08467570601851852,
    "va.metrics.6403": 0,
    "va.metrics.6436": 0,
    "va.metrics.6530": 0,
    "va.metrics.6552": 1,
    "va.metrics.6556": 1,
    "va.metrics.13431": 78,
    "va.dates.23": 1762184579113,
    "va.dates.24": 1762184693944,
    "va.dates.6401": 1762186493952,
    "va.dates.audience_tealium-education_data-access-public_106_count_ts": 1762193809933,
    "va.dates.audience_tealium-education_data-access-public_113_count_ts": 1762193809933,
    "va.dates.audience_tealium-education_data-access-public_121_count_ts": 1762193809933,
    "va.dates.audience_tealium-education_data-access-public_140_count_ts": 1762194629992,
    "va.properties.17": "https://ecommerce.tealiumdemo.com/",
    "va.properties.54": "Mac desktop",
    "va.properties.56": "Chrome",
    "va.properties.58": "Mac OS X",
    "va.properties.60": "browser",
    "va.properties.62": "Chrome",
    "va.properties.5128": "[Elizabeth Knit Top]",
    "va.properties.5192": "[Elizabeth Knit Top]",
    "va.properties.5194": "Mac desktop",
    "va.properties.5227": "https://ecommerce.tealiumdemo.com/",
    "va.properties.5278": "6800FEBEC3F30E74-3D7868A072444310",
    "va.properties.5427": "GA1.1.1204567686.1762184580",
    "va.properties.6524": "Eyewear",
    "va.properties.7552": "019a3c4d9b90001f4e32b67756e204075002206d00fb8retail-21",
    "va.properties.profile": "retail-21",
    "va.properties.account": "tealiumlabs",
    "va.flags.27": true,
    "va.flags.5106": false,
    "va.flags.5108": false,
    "va.flags.5168": true,
    "va.flags.5252": false,
    "va.property_sets.5280": [
        "Elizabeth Knit Top"
    ],
    "va.property_sets.5282": [
        "Elizabeth Knit Top"
    ],
    "va.metric_sets.55.Mac desktop": 1,
    "va.metric_sets.57.Chrome": 1,
    "va.metric_sets.59.Mac OS X": 1,
    "va.metric_sets.61.browser": 1,
    "va.metric_sets.63.Chrome": 1,
    "va.metric_sets.5129.[Elizabeth Knit Top]": 2,
    "va.metric_sets.5193.[Elizabeth Knit Top]": 2,
    "va.metric_sets.5195.Mac desktop": 39,
    "va.current_visit.metrics.7": 30,
    "va.current_visit.metrics.12": 32.715516666666666,
    "va.current_visit.metrics.80": 0,
    "va.current_visit.metrics.5300": 10,
    "va.current_visit.dates.10": 1762193809932,
    "va.current_visit.dates.11": 1762195772863,
    "va.current_visit.properties.5": "https://ecommerce.tealiumdemo.com/",
    "va.current_visit.properties.44": "Chrome",
    "va.current_visit.properties.45": "Mac OS X",
    "va.current_visit.properties.46": "Mac desktop",
    "va.current_visit.properties.47": "browser",
    "va.current_visit.properties.48": "Chrome",
    "va.current_visit.flags.13": true,
    "va.current_visit.flags.6476": false,
    "va.current_visit.flags.6480": false,
    "va.current_visit.property_sets.49": [
        "Chrome"
    ],
    "va.current_visit.property_sets.50": [
        "Mac OS X"
    ],
    "va.current_visit.property_sets.51": [
        "Mac desktop"
    ],
    "va.current_visit.property_sets.52": [
        "browser"
    ],
    "va.current_visit.property_sets.53": [
        "Chrome"
    ],
    "va.current_visit.event_cache_ids": [
        {
            "eventId": "f9d46c64-f651-4338-9898-24db7a70433e",
            "postTime": 1762193809932,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "7e460257-4532-420b-a7db-be91cd3914fc",
            "postTime": 1762194253029,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "a022fc00-3bb3-4b38-ad32-fbfead8ae058",
            "postTime": 1762194253119,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "f5e89a1e-e713-4787-987c-8c902aed9c79",
            "postTime": 1762194255909,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "421b6c1d-ff92-4a02-874f-3e948bb4ccff",
            "postTime": 1762194257939,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "6c91e67f-91da-4900-8bb7-e719ea45d00b",
            "postTime": 1762194624756,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "0f968995-628f-43f0-9f78-2e436cd3c7e7",
            "postTime": 1762194626971,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "700900ad-37f6-48e0-963e-d00d30da097c",
            "postTime": 1762194629852,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "86a3873b-b347-4ca5-8376-7fa0d61bcbff",
            "postTime": 1762194637137,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "226a5e94-4d88-4d5e-8ac8-f1786f5de3a4",
            "postTime": 1762194639182,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "3b725cac-2787-4364-b0a5-02e39342b97a",
            "postTime": 1762194646086,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "1c58553a-d18d-4c07-9dbe-a8cf9cd4cfa3",
            "postTime": 1762194661104,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "9cb5875e-c0e5-445f-8a75-444f4a2e1699",
            "postTime": 1762194663806,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "c0fe2df4-05c0-472b-a53e-fa79eb9fca93",
            "postTime": 1762194665866,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "c4a142e6-65e1-43a8-86f1-4a19abbc804a",
            "postTime": 1762195492730,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "72947f3a-3b0c-4c3f-b691-24e474b5753f",
            "postTime": 1762195494902,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "9b7c73f7-73e0-48f4-9e3d-47d66835d695",
            "postTime": 1762195709371,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "9096063b-f3c7-4286-b3df-6c5e2fd058c3",
            "postTime": 1762195709962,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "c14622a0-c7c6-451f-8250-ff7988674ce3",
            "postTime": 1762195713301,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "c73d5c26-d437-407e-9c50-acf587c308d6",
            "postTime": 1762195715998,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "5a2f89b1-87a4-4075-9ff9-03f9a4aa2262",
            "postTime": 1762195720287,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "de621018-fb4c-4fc3-b2e1-b46b54def6bd",
            "postTime": 1762195723172,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "ce004547-88ff-4074-abff-de1260e556b3",
            "postTime": 1762195725495,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "c61e273e-802c-4141-b995-927776972ad5",
            "postTime": 1762195732186,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "b513e0ab-291e-4f73-a0cb-c228ed2cc122",
            "postTime": 1762195734545,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "378b4f1a-8767-4599-a0a6-db80faacf0b2",
            "postTime": 1762195759499,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "a3fcd71d-c40d-4950-a1cd-ea17a306795f",
            "postTime": 1762195760318,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "2bb36f0b-a7f3-407c-ba71-82ac9b181534",
            "postTime": 1762195761905,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "e521118c-b8ba-4ad0-9be1-25f7ab69b32c",
            "postTime": 1762195770387,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        },
        {
            "eventId": "dfd2213c-dcd5-4709-af36-5c0d35f7feca",
            "postTime": 1762195772863,
            "deletedCachedEvent": false,
            "bulkImportEvent": false
        }
    ],
    "va._visits_expire_at_with_details.1769904000000": [
        {
            "visitId": "1a3d1f7e0ed2dca8850c25852a99d0c2ac27ed7d46ad2271185e89c2cd0c4d64",
            "lastEventTimestamp": 1762184693952,
            "eventCount": 11
        }
    ],
    "va.badges.31": true,
    "va.badges.5140": true,
    "va.badges.5328": true,
    "va.badges.6550": true,
    "va.audiences.tealium-education_data-access-public_140": "Product Fan",
    "va.audiences.tealium-education_data-access-public_121": "Visitors - Unknown",
    "va.audiences.tealium-education_data-access-public_106": "All Users - For Splunk",
    "va.audiences.tealium-education_data-access-public_113": "Adobe Visitor Update",
    "va.metrics.5247": 0.10550912037037037,
    "va.metrics.31443": 0,
    "va.metrics.21291303": 0,
    "va.metrics.21291432": 0,
    "va.metrics.21291752": 1.91385,
    "va.metrics.21291754": 13,
    "va.dates.audience_tealiumlabs_retail-21_174_count_ts": 1762193809932,
    "va.dates.audience_tealiumlabs_retail-21_171_count_ts": 1762193809932,
    "va.dates.audience_tealiumlabs_retail-21_173_count_ts": 1762193809932,
    "va.dates.audience_tealiumlabs_retail-21_129_count_ts": 1762194624817,
    "va.properties.5202": "Eyewear",
    "va.properties.5230": "Accessories",
    "va.properties.5232": "Elizabeth Knit Top",
    "va.properties.21283984": "019a3c4d9b90001f4e32b67756e204075002206d00fb8retail-21",
    "va.properties.21286378": "fb.1.1762184604218.54067723701956395",
    "va.properties.21286644": "1762195772768",
    "va.properties.21286646": "1762195772783",
    "va.properties.21286648": "56555",
    "va.properties.21286652": "4444",
    "va.properties.21286654": "33",
    "va.properties.21286656": "333",
    "va.properties.21286658": "222",
    "va.property_sets.5239": [
        "Accessories"
    ],
    "va.property_sets.5241": [
        "Eyewear"
    ],
    "va.property_sets.5243": [
        "Elizabeth Knit Top"
    ],
    "va.metric_sets.5203.Eyewear": 1,
    "va.metric_sets.5231.Accessories": 1,
    "va.metric_sets.5233.Elizabeth Knit Top": 2,
    "va.property_lists.21288726": [
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty",
        "qwerty"
    ],
    "va.current_visit.metrics.6957": 30,
    "va.current_visit.dates.21289823": 1762195772863,
    "va.current_visit.properties.5467": "Tealium Ecommerce Demo",
    "va.current_visit.properties.5498": "/",
    "va.current_visit.properties.5500": "141.156.166.69",
    "va.current_visit.properties.5502": "https://ecommerce.tealiumdemo.com/",
    "va.current_visit.properties.5504": "ecommerce.tealiumdemo.com",
    "va.current_visit.flags.34716": false,
    "va._visits_expire_at_with_details.1767225600000": [
        {
            "visitId": "25b29880589cc75986e930c8e9249596a749e5052368f550d1d6f2b10f00aa46",
            "lastEventTimestamp": 1762184693944,
            "eventCount": 13
        }
    ],
    "va.last_visit_id": "25b29880589cc75986e930c8e9249596a749e5052368f550d1d6f2b10f00aa46",
    "va.badges.5165": true,
    "va.badges.5179": true,
    "va.badges.21280478": true,
    "va.audiences.tealiumlabs_retail-21_171": "Customers without Recommendations",
    "va.audiences.tealiumlabs_retail-21_173": "All Visitor from Web",
    "va.audiences.tealiumlabs_retail-21_174": " IDC - Unknown Visitors",
    "va.audiences.tealiumlabs_retail-21_129": "Engaged User",
    "_ccity": "",
    "_ccountry": "",
    "_ccurrency": "",
    "_ccustid": "",
    "_corder": "",
    "_cpromo": "",
    "_cship": "",
    "_cstate": "",
    "_cstore": "",
    "_csubtotal": "",
    "_ctax": "",
    "_ctotal": "",
    "_ctype": "",
    "_czip": "",
    "_cprod": [],
    "_cprodname": [],
    "_cbrand": [],
    "_ccat": [],
    "_ccat2": [],
    "_cquan": [],
    "_cprice": [],
    "_csku": [],
    "_cpdisc": [],
    "gua_cid": "GA1.1.1204567686.1762184580",
    "gua_cid_as": "GA1.1.1204567686.1762184580",
    "previous_page_name": "undefined",
    "tealium_timestamp_library_load": 1762195799176,
    "test_timestamp": "2025-02-01T14:59:55.711",
    "product_sku_string": "A8DLKU5",
    "available_quantity": "1323",
    "_customer_email": ""
}