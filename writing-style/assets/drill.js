/* Reusable interactive components for the ASD-STE100 workspace.
 *
 *   .drill  — a rewrite exercise with a live per-sentence word counter.
 *   .quiz   — multiple choice retrieval practice with immediate feedback.
 *
 * Both are progressive: the markup reads fine with JavaScript switched off,
 * and both print cleanly (buttons are hidden by course.css @media print).
 */

(function () {
  "use strict";

  /* ---- helpers ---------------------------------------------------- */

  function splitSentences(text) {
    return text
      .replace(/\s+/g, " ")
      .split(/(?<=[.!?:])\s+/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  function countWords(s) {
    return (s.match(/[A-Za-z0-9'’\-\/]+/g) || []).length;
  }

  function store(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  function recall(key) {
    try { return window.localStorage.getItem(key) || ""; } catch (e) { return ""; }
  }

  /* ---- drill ------------------------------------------------------ */

  function initDrill(root, index) {
    var max = parseInt(root.dataset.max || "20", 10);
    var source = root.dataset.source || "";
    var id = "ste-drill-" + (document.title || "") + "-" + index;
    var model = root.querySelector("template.model");
    var before = document.createElement("div");
    before.className = "d-before";
    before.innerHTML = '<span class="label">Before &middot; ' +
      countWords(source) + " words in " + splitSentences(source).length +
      " sentence(s)</span>" + source;

    var ta = document.createElement("textarea");
    ta.className = "d-input";
    ta.rows = 4;
    ta.spellcheck = true;
    ta.placeholder = "Rewrite it here. Every sentence must be " + max + " words or fewer.";
    ta.value = recall(id);

    var meter = document.createElement("div");
    meter.className = "d-meter";

    var actions = document.createElement("div");
    actions.className = "d-actions no-print";
    var reveal = document.createElement("button");
    reveal.type = "button";
    reveal.textContent = "Show a model answer";
    actions.appendChild(reveal);

    var answer = document.createElement("div");
    answer.className = "d-answer";
    answer.hidden = true;
    if (model) { answer.innerHTML = model.innerHTML; }

    root.textContent = "";
    root.append(before, ta, meter, actions, answer);

    function update() {
      var text = ta.value.trim();
      store(id, ta.value);
      if (!text) { meter.innerHTML = ""; return; }

      var sentences = splitSentences(text);
      var total = countWords(text);
      var srcWords = countWords(source);
      var rows = sentences.map(function (s, i) {
        var n = countWords(s);
        var state = n <= max ? "ok" : "over";
        return '<li class="' + state + '"><span class="n">' + n + "</span> " +
          (n <= max ? "&#10003;" : "&#10007; " + (n - max) + " over") +
          ' <span class="frag">' + s.slice(0, 44) + (s.length > 44 ? "&hellip;" : "") + "</span></li>";
      }).join("");

      var overs = sentences.filter(function (s) { return countWords(s) > max; }).length;
      var verdict;
      if (overs > 0) {
        verdict = '<strong class="bad">' + overs + " sentence(s) still over " + max + " words.</strong>";
      } else if (total < srcWords * 0.55) {
        verdict = '<strong class="warn">Under ' + max + " words each &mdash; but you have cut " +
          Math.round(100 - (total / srcWords) * 100) +
          "% of the words. Check you have not dropped articles or verbs to hit the limit (that is its own rule violation).</strong>";
      } else {
        verdict = '<strong class="good">Every sentence is ' + max + " words or fewer, across " +
          sentences.length + " sentences. Now read it aloud.</strong>";
      }
      meter.innerHTML = "<ul>" + rows + "</ul>" + verdict;
    }

    ta.addEventListener("input", update);
    reveal.addEventListener("click", function () {
      answer.hidden = !answer.hidden;
      reveal.textContent = answer.hidden ? "Show a model answer" : "Hide the model answer";
    });
    update();
  }

  /* ---- quiz -------------------------------------------------------- */

  function initQuestion(q) {
    var correct = parseInt(q.dataset.answer || "0", 10);
    var explain = q.querySelector("template.explain");
    var list = q.querySelector("ul");
    if (!list) { return; }
    var out = document.createElement("div");
    out.className = "q-out";
    out.hidden = true;
    if (explain) { out.innerHTML = explain.innerHTML; }

    Array.prototype.forEach.call(list.children, function (li, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = li.textContent.trim();
      li.textContent = "";
      li.appendChild(b);
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(list.querySelectorAll("button"), function (other) {
          other.disabled = true;
        });
        b.classList.add(i === correct ? "right" : "wrong");
        if (i !== correct) {
          list.querySelectorAll("button")[correct].classList.add("right");
        }
        out.hidden = false;
      });
    });
    q.appendChild(out);
  }

  /* ---- boot -------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".drill"), initDrill);
    Array.prototype.forEach.call(document.querySelectorAll(".quiz .q"), initQuestion);
  });
})();
