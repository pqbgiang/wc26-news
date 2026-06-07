/**
 * country-flags.js
 * Automatically inject country flags before country names in page content
 * Usage: Add <script src="../js/country-flags.js"></script> to pages
 */

const COUNTRY_FLAGS = {
  "Mexico":"🇲🇽","South Africa":"🇿🇦","Korea Republic":"🇰🇷","Czechia":"🇨🇿",
  "Canada":"🇨🇦","Bosnia and Herzegovina":"🇧🇦","Qatar":"🇶🇦","Switzerland":"🇨🇭",
  "Brazil":"🇧🇷","Morocco":"🇲🇦","Haiti":"🇭🇹","Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "USA":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Turkiye":"🇹🇷",
  "Germany":"🇩🇪","Curacao":"🇨🇼","Netherlands":"🇳🇱","Sweden":"🇸🇪",
  "Côte d'Ivoire":"🇨🇮","Ecuador":"🇪🇨","Tunisia":"🇹🇳","Japan":"🇯🇵",
  "Spain":"🇪🇸","Cabo Verde":"🇨🇻","Saudi Arabia":"🇸🇦","Uruguay":"🇺🇾",
  "Belgium":"🇧🇪","Egypt":"🇪🇬","IR Iran":"🇮🇷","New Zealand":"🇳🇿",
  "France":"🇫🇷","Senegal":"🇸🇳","Iraq":"🇮🇶","Norway":"🇳🇴",
  "Argentina":"🇦🇷","Algeria":"🇩🇿","Austria":"🇦🇹","Jordan":"🇯🇴",
  "Ghana":"🇬🇭","Panama":"🇵🇦","England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croatia":"🇭🇷",
  "Portugal":"🇵🇹","Congo DR":"🇨🇩","Uzbekistan":"🇺🇿","Colombia":"🇨🇴",
};

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
    if (node.parentElement.tagName === 'CODE' || node.parentElement.tagName === 'PRE') {
      continue;
    }

    const text = node.textContent;

    // Skip if text already contains emoji flags (avoid double flags)
    if (/[\uD83C-\uD83E][\uDC00-\uDE00]/.test(text)) {
      continue;
    }

    let hasMatch = false;

    // Check if any country name exists in this node
    for (const country in COUNTRY_FLAGS) {
      // Use word boundary to avoid partial matches
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

    // Replace country names with flagged versions
    for (const country in COUNTRY_FLAGS) {
      const flag = COUNTRY_FLAGS[country];
      const regex = new RegExp(`\\b${country.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      html = html.replace(regex, `${flag} ${country}`);
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
