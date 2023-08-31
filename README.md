# ClickOutside

Vue 3 click outside directive.

Forked from https://github.com/vue-bulma/click-outside

Based on vite vue ts template

## Installation

```
$ npm install @ankorstore/vue-click-outside
```

## Example usage

```vue
<template>
  <div ref="popupItem">
    <div v-click-outside="hide" @click="toggle">Toggle</div>
    <div v-show="opened">Popup item</div>
  </div>
</template>

<script>
import { ClickOutside } from 'vue-click-outside'

export default {
  // do not forget this section
  directives: {
    ClickOutside
  },
  data () {
    return {
      opened: false
    }
  },

  methods: {
    toggle () {
      this.opened = true
    },

    hide () {
      this.opened = false
    }
  },
}
</script>
```

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)

---

# Contributing

Thanks for being interested in contributing to this project!

## Setup

Clone this repo to your local machine and install the dependencies.

```
npm install
```

Start local dev enviroment 

```
npm run dev
```


