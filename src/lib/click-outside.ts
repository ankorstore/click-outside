import { DirectiveBinding, ObjectDirective } from "vue";

const validate = (binding: DirectiveBinding) => {
  if (typeof binding.value !== "function") {
    console.warn(
      "[Vue-click-outside:] provided expression",
      binding.value,
      "is not a function."
    );
    return false;
  }

  return true;
};

const isPopup = (popupItem: HTMLElement, elements: HTMLElement[]) => {
  if (!popupItem || !elements) return false;

  for (let i = 0, len = elements.length; i < len; i++) {
    try {
      if (popupItem.contains(elements[i])) {
        return true;
      }
      if (elements[i].contains(popupItem)) {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  return false;
};

export const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    if (!validate(binding)) return;

    // Define Handler and cache it on the element
    function handler(e: MouseEvent | TouchEvent) {
      if (!binding.instance) return;

      // some components may have related popup item, on which we shall prevent the click outside event handler.
      const elements = (e as any).path || (e.composedPath && e.composedPath());
      elements && elements.length > 0 && elements.unshift(e.target);

      if (
        el.contains(e.target) ||
        ("popupItem" in binding.instance &&
          isPopup((binding.instance as any).popupItem, elements))
      )
        return;

      el.__vueClickOutside__.callback(e);
    }

    // add Event Listeners
    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value,
    };

    if (document) {
      const clickHandler =
        "ontouchstart" in document.documentElement ? "touchstart" : "click";
      document.addEventListener(clickHandler, handler);
    }
  },

  updated: function (el, binding) {
    if (validate(binding)) el.__vueClickOutside__.callback = binding.value;
  },

  unmounted: function (el) {
    // Remove Event Listeners
    const clickHandler =
      "ontouchstart" in document.documentElement ? "touchstart" : "click";
    if (document) {
      el.__vueClickOutside__ &&
        document.removeEventListener(
          clickHandler,
          el.__vueClickOutside__.handler
        );
      delete el.__vueClickOutside__;
    }
  },
};
