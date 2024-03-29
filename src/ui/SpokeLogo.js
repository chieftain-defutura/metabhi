import React, { Component } from "react"
import configs from "../configs"

export default class SpokeLogo extends Component {
  render() {
    if (configs.isMoz()) {
      return (
        <svg width="150" height="156" viewBox="0 0 150 156" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M76.8293 74.9372L118.934 61.2856L76.8293 31.4424V74.9372Z" fill="#338BFF" />
          <path d="M76.8293 0V27.3345L113.875 18.0732L80.1429 1.03484L76.8293 0Z" fill="#338BFF" />
          <path d="M117.073 16.7564L119.551 13.286L95.2265 5.72852L117.073 16.7564Z" fill="#338BFF" />
          <path d="M49.0035 117.001H100.997L75 80.6035L49.0035 117.001Z" fill="#0053BF" />
          <path d="M72.5435 29.3309L33.6585 19.6201L29.2474 59.9999L72.5435 29.3309Z" fill="#66A8FF" />
          <path d="M73.1707 74.9372V31.4424L31.0662 61.2856L73.1707 74.9372Z" fill="#66A8FF" />
          <path d="M32.9268 16.7564L54.7735 5.72852L30.4495 13.286L32.9268 16.7564Z" fill="#66A8FF" />
          <path d="M73.1708 0L69.8467 1.03484L36.115 18.0732L73.1708 27.3345V0Z" fill="#66A8FF" />
          <path d="M122.31 64.7461L105.711 116.112L142.558 99.3768L122.31 64.7461Z" fill="#006EFF" />
          <path d="M77.9373 78.429L103.934 114.816L120.115 64.7461L77.9373 78.429Z" fill="#006EFF" />
          <path d="M76.0453 155.153L118.756 141.868L103.369 120.324L76.0453 151.432V155.153Z" fill="#0053BF" />
          <path d="M146.686 48.7003L118.641 21.4912L122.854 60.0104L148.84 51.5853L146.686 48.7003Z" fill="#338BFF" />
          <path d="M118.777 17.9684L136.976 35.6339L121.254 14.498L118.777 17.9684Z" fill="#338BFF" />
          <path d="M77.4564 29.3309L120.753 59.9999L116.341 19.6201L77.4564 29.3309Z" fill="#338BFF" />
          <path d="M28.2543 139.756L43.6934 118.139L8.60277 102.209L26.2892 137.122L28.2543 139.756Z" fill="#003780" />
          <path d="M144.826 101.206L132.878 124.788L149.331 102.669L144.826 101.206Z" fill="#006EFF" />
          <path d="M141.387 102.209L106.307 118.139L121.746 139.756L123.7 137.132L141.387 102.209Z" fill="#006EFF" />
          <path d="M72.0627 78.429L29.885 64.7461L46.0662 114.816L72.0627 78.429Z" fill="#003780" />
          <path d="M150 73.3906L145.484 99.2199L150 100.683V73.3906Z" fill="#006EFF" />
          <path d="M150 55.0557L124.003 63.4808L143.3 96.5121L150 58.2229V55.0557Z" fill="#006EFF" />
          <path d="M73.9547 151.432L46.6202 120.324L31.2439 141.868L73.9547 155.153V151.432Z" fill="#0053BF" />
          <path d="M101.686 119.09H48.324L75 149.445L101.686 119.09Z" fill="#0053BF" />
          <path d="M1.16026 51.5853L27.1463 60.0104L31.3589 21.4912L3.31357 48.7003L1.16026 51.5853Z" fill="#66A8FF" />
          <path d="M31.223 17.9684L28.7456 14.498L13.0244 35.6339L31.223 17.9684Z" fill="#66A8FF" />
          <path d="M7.43204 99.3768L44.2892 116.112L27.6899 64.7461L7.43204 99.3768Z" fill="#003780" />
          <path d="M0 58.2438L6.67944 96.5121L25.9965 63.4808L0 55.0557V58.2438Z" fill="#003780" />
          <path d="M0 100.683L4.50523 99.2191L0 73.4316V100.683Z" fill="#003780" />
          <path d="M5.16378 101.206L0.669006 102.659L17.0906 124.746L5.16378 101.206Z" fill="#003780" />
        </svg>
      )
    } else {
      return (
        <svg width="150" height="156" viewBox="0 0 150 156" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M75 0L128.033 21.967L150 75L128.033 128.033L75 150L21.967 128.033L0 75L21.967 21.967L75 0Z"
            fill="#2F80ED"
          />
        </svg>
      )
    }
  }
}
