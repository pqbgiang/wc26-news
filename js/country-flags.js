/**
 * country-flags.js
 * Automatically inject country flag SVGs before country names in page content
 * Usage: Add <script src="../js/country-flags.js"></script> to pages
 */

const COUNTRY_FLAGS = {
  "Mexico":"mx","South Africa":"za","Korea Republic":"kr","Czechia":"cz",
  "Canada":"ca","Bosnia and Herzegovina":"ba","Qatar":"qa","Switzerland":"ch",
  "Brazil":"br","Morocco":"ma","Haiti":"ht","Scotland":"gb-sct",
  "USA":"us","Paraguay":"py","Australia":"au","Turkiye":"tr",
  "Germany":"de","Curacao":"cw","Netherlands":"nl","Sweden":"se",
  "Côte d'Ivoire":"ci","Ecuador":"ec","Tunisia":"tn","Japan":"jp",
  "Spain":"es","Cabo Verde":"cv","Saudi Arabia":"sa","Uruguay":"uy",
  "Belgium":"be","Egypt":"eg","IR Iran":"ir","New Zealand":"nz",
  "France":"fr","Senegal":"sn","Iraq":"iq","Norway":"no",
  "Argentina":"ar","Algeria":"dz","Austria":"at","Jordan":"jo",
  "Ghana":"gh","Panama":"pa","England":"gb-eng","Croatia":"hr",
  "Portugal":"pt","Congo DR":"cd","Uzbekistan":"uz","Colombia":"co",
};

function getFlagSvg(countryCode) {
  // Using flagcdn.com for flag SVGs
  return `<img src="https://flagcdn.com/h20/${countryCode}.png" alt="flag" style="display:inline-block;margin-right:4px;vertical-align:middle;width:20px;height:auto;border-radius:2px">`;
}

function injectCountryFlags() {
  const content = document.querySelector('main');
  if (!content) return;

  // Walk through all text nodes in main content
  const walker = document.createTreeWalker(
    content,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const nodesToReplace = [];
  let node;

  while (node = walker.nextNode()) {
    // Skip nodes that already have flags or are in code blocks
    if (node.parentElement.tagName === 'CODE' || node.parentElement.tagName === 'PRE' || node.parentElement.tagName === 'IMG') {
      continue;
    }

    const text = node.textContent;

    // Skip if text already contains flag images
    if (node.parentElement.querySelector('img[alt="flag"]')) {
      continue;
    }

    let hasMatch = false;

    // Check if any country name exists in this node
    for (const country in COUNTRY_FLAGS) {
      const regex = new RegExp(`\\b${country.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      if (regex.test(text)) {
        hasMatch = true;
        break;
      }
    }

    if (hasMatch) {
      nodesToReplace.push(node);
    }
  }

  // Replace text nodes with flagged versions
  nodesToReplace.forEach(node => {
    let html = node.textContent;

    // Replace country names with flag + name
    for (const country in COUNTRY_FLAGS) {
      const countryCode = COUNTRY_FLAGS[country];
      const flagHtml = getFlagSvg(countryCode);
      const regex = new RegExp(`\\b${country.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      html = html.replace(regex, `${flagHtml} ${country}`);
    }

    const span = document.createElement('span');
    span.innerHTML = html;
    node.parentNode.replaceChild(span, node);
  });
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectCountryFlags);
} else {
  injectCountryFlags();
}
