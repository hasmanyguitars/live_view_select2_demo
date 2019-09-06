// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import LiveSocket from "phoenix_live_view"

import $ from "jquery";
import "select2"

const Hooks = {
  SelectorHook: {
    mounted() { this.configureSelect() },
    updated() { this.configureSelect() },

    configureSelect() {
      let self = this;

      $(this.el).select2({
        placeholder: 'Choose template',
        minimumResultsForSearch: Infinity,
        templateResult: self.formatSelect
      }).off("select2:select").on("select2:select", function(e) {
        self.pushEvent("select_changed", {"filters": {"template": e.params.data.id}})
      });
    },

    formatSelect(option) {
      if (!option.id) {
        return option.text;
      }

      var $option = $(
        '<div class="select__title">' + option.text + '</div><div class="select__subtext">' + option.element.dataset.subtext + '</div>'
      );
      return $option;
    }
  }
}

let liveSocket = new LiveSocket("/live", {hooks: Hooks})
liveSocket.connect()