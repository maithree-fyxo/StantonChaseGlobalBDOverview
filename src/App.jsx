import { useState, useMemo, useRef, useEffect, Children, cloneElement } from "react";

const LOGO_SVG = `<svg viewBox="0 0 249 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.3891 18.1504C15.3891 22.3027 12.2531 24.9292 7.06461 24.9292C4.53994 24.9292 2.1246 24.2906 1.08094 23.652C0.755414 23.4383 0.467164 23.0854 0.432375 22.658C0.28825 20.8117 0 19.0027 0 18.5753C0 18.1504 0.28825 17.8671 0.86475 17.8671C1.40398 17.8671 1.58537 18.1156 1.65744 18.5057C1.87362 19.6761 2.19915 20.7422 2.81044 21.6293C3.459 22.5164 5.11644 23.3314 7.24352 23.3314C10.5236 23.3314 12.5414 21.6989 12.5414 19.1791C12.5414 17.3329 11.2815 15.9488 9.08236 14.8132L5.69294 13.0041C2.4874 11.2995 1.00887 9.52526 1.00887 6.71979C1.00887 2.92285 4.32375 0.544785 8.8289 0.544785C11.0628 0.544785 12.5066 0.900127 13.5502 1.18341C14.2709 1.39711 14.7405 1.74997 14.7753 2.24943C14.8474 3.20613 15.1008 5.90474 15.1008 6.11844C15.1008 6.57815 14.7753 6.79186 14.3802 6.79186C13.8037 6.79186 13.5502 6.50858 13.5154 6.15323C13.4061 5.30091 13.011 4.02366 12.5066 3.34777C11.858 2.5675 10.7398 2.10531 8.79411 2.10531C5.40469 2.10531 3.71246 3.66832 3.71246 5.86995C3.71246 7.46527 4.64927 8.745 7.13667 10.057L10.3795 11.8313C13.6944 13.608 15.3891 15.1685 15.3891 18.1504Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.7889 22.7301C28.0398 23.0134 28.4722 23.155 29.1928 23.155C29.3022 23.155 29.8414 23.1202 30.0228 23.1202C30.2738 23.1202 30.49 23.3314 30.49 23.7936C30.49 24.2558 30.2738 24.5043 29.9855 24.5043C29.337 24.5043 27.7168 24.3279 25.9848 24.3279C24.2553 24.3279 22.6699 24.5043 22.2748 24.5043C21.912 24.5043 21.6611 24.2906 21.6611 23.7936C21.6611 23.3687 21.8773 23.1202 22.2003 23.1202C22.3469 23.1202 22.8141 23.155 22.9582 23.155C23.644 23.155 24.1485 22.9065 24.3647 22.5512C24.5436 22.2679 24.725 21.6641 24.725 20.1383V9.38361C24.725 8.84936 24.6877 8.45923 24.5088 8.35238C24.1833 8.14116 23.4278 8.14116 22.3096 8.14116C20.8311 8.14116 20.3267 8.24801 19.8222 8.70772C19.3178 9.09785 19.1016 9.98496 18.9948 10.8025C18.9575 11.051 18.7761 11.2647 18.381 11.2647C17.9834 11.2647 17.7324 11.0858 17.7324 10.8373C17.7324 10.3776 17.9834 8.31759 17.9834 7.21677C17.9834 6.8987 18.1648 6.71979 18.4183 6.71979C18.9948 6.71979 19.4992 6.86143 26.0942 6.86143C32.8332 6.86143 33.2656 6.75458 33.8421 6.75458C34.1304 6.75458 34.3838 6.86143 34.3838 7.25404C34.3838 8.21074 34.4907 10.6261 34.4907 10.7677C34.4907 11.1231 34.2397 11.2995 33.8794 11.2995C33.4097 11.2995 33.2308 11.0858 33.2308 10.8373C33.0867 9.80854 32.9053 9.16991 32.545 8.74499C32.1474 8.24801 31.3547 8.14116 29.9507 8.14116C28.4722 8.14116 27.8609 8.14116 27.6075 8.2828C27.3913 8.42444 27.3565 8.70772 27.3565 9.38361V20.1383C27.3565 21.7709 27.5354 22.4095 27.7889 22.7301Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.2768 22.444C38.2768 22.941 38.6719 23.1199 39.8622 23.1199C40.0784 23.1199 40.5108 23.0826 40.6549 23.0826C41.0152 23.0826 41.1593 23.3336 41.1593 23.7237C41.1593 24.0791 41.1245 24.504 40.6549 24.504C40.3666 24.504 38.1327 24.3624 36.9772 24.3624C35.8242 24.3624 34.7085 24.504 34.383 24.504C33.9506 24.504 33.8438 24.1487 33.8438 23.8306C33.8438 23.4032 33.9879 23.0826 34.3109 23.0826C34.455 23.0826 34.6364 23.1199 34.8526 23.1199C35.1409 23.1199 35.7174 23.0131 36.0056 22.5857C36.2566 22.1955 36.6542 21.5917 37.1959 20.3517C39.0695 16.0901 41.2314 11.2644 42.3844 8.77948C42.4937 8.4962 42.6726 7.89236 42.7099 7.53702C42.7447 7.25374 42.854 7.07483 43.105 6.96798C43.5747 6.71948 44.4394 6.47099 44.7277 6.47099C44.9066 6.47099 45.0507 6.57784 45.1228 6.82634C45.2321 7.07483 45.339 7.46496 45.7365 8.38935C46.3503 9.94987 47.5754 12.9318 50.6741 20.3517C51.2506 21.7706 51.5388 22.2676 51.8271 22.6229C52.0805 22.941 52.5477 23.1199 53.0173 23.1199C53.1615 23.1199 53.3056 23.0826 53.4497 23.0826C53.738 23.0826 53.9541 23.3684 53.9541 23.7933C53.9541 24.2555 53.7728 24.504 53.487 24.504C53.1615 24.504 51.3947 24.3624 50.2069 24.3624C49.0514 24.3624 46.2783 24.504 46.0248 24.504C45.7018 24.504 45.5204 24.1487 45.5204 23.7933C45.5204 23.438 45.6272 23.0826 45.99 23.0826C46.0969 23.0826 46.4572 23.1199 46.5665 23.1199C47.8636 23.1199 48.4029 22.8714 48.4029 22.3396C48.4029 21.9122 48.2587 21.4873 47.8264 20.3517L47.1057 18.6123C46.8548 17.9364 46.6734 17.76 46.0969 17.76H40.6201C40.1132 17.76 39.897 18.0084 39.7181 18.4706L38.9602 20.3144C38.493 21.45 38.2768 22.0539 38.2768 22.444ZM40.727 16.0901C40.727 16.4106 40.9431 16.4454 41.701 16.4454H45.2669C45.8807 16.4454 46.0969 16.3759 46.0969 16.0901C46.0969 15.9485 45.99 15.7 45.9179 15.4887L43.7188 10.2704C43.6467 10.0567 43.5747 9.98466 43.4653 9.98466C43.3933 9.98466 43.3212 10.0915 43.2144 10.34L40.9431 15.4515C40.8711 15.6652 40.727 15.9857 40.727 16.0901Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M61.5617 23.1542C61.6685 23.1542 62.0288 23.1194 62.2102 23.1194C62.5706 23.1194 62.7147 23.4027 62.7147 23.8301C62.7147 24.1829 62.5333 24.5035 62.2102 24.5035C61.8847 24.5035 60.5503 24.3271 58.8208 24.3271C57.0913 24.3271 55.6501 24.5035 55.3618 24.5035C55.0015 24.5035 54.8574 24.1829 54.8574 23.7928C54.8574 23.4747 55.0015 23.1194 55.3618 23.1194C55.4687 23.1194 55.7594 23.1542 55.9035 23.1542C56.6589 23.1542 57.1634 22.9405 57.3796 22.6224C57.561 22.3019 57.7051 21.8769 57.7399 20.4208C57.8492 14.954 57.8492 12.1162 57.8492 10.9433C57.8492 9.63129 57.7399 8.95539 57.4516 8.60253C57.0193 8.10555 56.5496 8.06827 55.9383 8.06827C55.7942 8.06827 55.3618 8.10555 55.255 8.10555C54.8922 8.10555 54.748 7.81978 54.748 7.42965C54.748 6.93267 55.0015 6.75624 55.3618 6.75624C55.6501 6.75624 56.9124 6.89788 57.633 6.89788C58.4978 6.89788 59.4694 6.79103 59.8297 6.79103C60.19 6.79103 60.4087 6.96746 60.5876 7.21595C62.1009 9.1343 63.075 10.2699 65.2021 12.7175C67.1105 14.8844 68.7704 16.6934 71.0391 19.1783C71.1485 19.32 71.2553 19.4268 71.3647 19.4268C71.4715 19.4268 71.5088 19.32 71.5088 19.2131C71.5436 17.9359 71.5436 16.8723 71.5436 15.6994C71.5436 13.9973 71.4715 12.8592 71.3995 11.085C71.3274 9.63129 71.2205 8.9206 71.0764 8.63732C70.8602 8.28198 70.3558 8.06827 69.7047 8.06827C69.5258 8.06827 69.0214 8.10555 68.912 8.10555C68.5517 8.10555 68.3356 7.81978 68.3356 7.46444C68.3356 7.07431 68.4797 6.75624 68.9493 6.75624C69.1655 6.75624 70.6788 6.89788 72.4804 6.89788C73.9962 6.89788 75.1119 6.75624 75.3654 6.75624C75.8325 6.75624 75.9767 7.00473 75.9767 7.42965C75.9767 7.81978 75.7977 8.10555 75.4722 8.10555C75.2933 8.10555 74.9305 8.06827 74.7516 8.06827C73.9962 8.06827 73.7427 8.24719 73.5265 8.53047C73.2731 8.81375 73.1314 9.59401 73.0942 11.085C73.0569 12.0789 73.0569 13.9252 73.0569 16.1268C73.0569 21.8769 73.2383 23.8301 73.2383 24.1829C73.2383 24.5731 73.0221 24.8936 72.5177 24.8936C72.048 24.8936 71.8318 24.7172 71.725 24.5383C71.0043 23.6512 70.3558 22.7641 69.7047 22.0186C66.3551 18.1844 63.075 14.4222 59.939 10.8737C59.8297 10.7669 59.7576 10.6948 59.5787 10.6948C59.4694 10.6948 59.4346 10.7669 59.4346 10.9433C59.4346 12.5759 59.3998 13.8184 59.3998 15.451C59.3998 17.1208 59.3998 18.6813 59.4346 20.4208C59.4694 21.9117 59.6881 22.4087 59.939 22.692C60.1552 22.9778 60.6249 23.1542 61.5617 23.1542Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M87.5833 22.7301C87.8367 23.0134 88.2691 23.155 88.9897 23.155C89.0966 23.155 89.6383 23.1202 89.8172 23.1202C90.0706 23.1202 90.2868 23.3314 90.2868 23.7936C90.2868 24.2558 90.0706 24.5043 89.7824 24.5043C89.1338 24.5043 87.5112 24.3279 85.7817 24.3279C84.0522 24.3279 82.4668 24.5043 82.0692 24.5043C81.7089 24.5043 81.4555 24.2906 81.4555 23.7936C81.4555 23.3687 81.6741 23.1202 81.9972 23.1202C82.1413 23.1202 82.6109 23.155 82.7551 23.155C83.4384 23.155 83.9429 22.9065 84.159 22.5512C84.3404 22.2679 84.5194 21.6641 84.5194 20.1383V9.38361C84.5194 8.84936 84.4846 8.45923 84.3032 8.35238C83.9801 8.14116 83.2222 8.14116 82.1065 8.14116C80.628 8.14116 80.1235 8.24801 79.6191 8.70772C79.1147 9.09785 78.8985 9.98496 78.7891 10.8025C78.7544 11.051 78.573 11.2647 78.1779 11.2647C77.7803 11.2647 77.5293 11.0858 77.5293 10.8373C77.5293 10.3776 77.7803 8.31759 77.7803 7.21677C77.7803 6.8987 77.9617 6.71979 78.2126 6.71979C78.7891 6.71979 79.2936 6.86143 85.8885 6.86143C92.6301 6.86143 93.0625 6.75458 93.639 6.75458C93.9272 6.75458 94.1782 6.86143 94.1782 7.25404C94.1782 8.21074 94.2875 10.6261 94.2875 10.7677C94.2875 11.1231 94.0341 11.2995 93.6738 11.2995C93.2066 11.2995 93.0252 11.0858 93.0252 10.8373C92.8811 9.80854 92.7022 9.16991 92.3419 8.74499C91.9443 8.24801 91.1516 8.14116 89.7451 8.14116C88.2691 8.14116 87.6553 8.14116 87.4043 8.2828C87.1881 8.42444 87.1509 8.70772 87.1509 9.38361V20.1383C87.1509 21.7709 87.3323 22.4095 87.5833 22.7301Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M105.244 24.9285C99.3698 24.9285 96.127 20.8483 96.127 15.9481C96.127 9.9147 100.488 6.40103 105.749 6.40103C111.481 6.40103 114.796 10.1632 114.796 15.2399C114.796 20.6346 111.228 24.9285 105.244 24.9285ZM105.642 7.78513C101.857 7.78513 99.2977 10.5533 99.2977 15.3467C99.2977 20.493 101.785 23.5097 105.425 23.5097C109.21 23.5097 111.625 20.7763 111.625 15.7368C111.625 10.6254 109.138 7.78513 105.642 7.78513Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M123.157 22.692C123.373 22.9778 123.843 23.1542 124.78 23.1542C124.887 23.1542 125.247 23.1194 125.428 23.1194C125.789 23.1194 125.933 23.4027 125.933 23.8301C125.933 24.1829 125.754 24.5035 125.428 24.5035C125.103 24.5035 123.771 24.3271 122.042 24.3271C120.31 24.3271 118.868 24.5035 118.58 24.5035C118.22 24.5035 118.076 24.1829 118.076 23.7928C118.076 23.4747 118.22 23.1194 118.58 23.1194C118.689 23.1194 118.978 23.1542 119.122 23.1542C119.877 23.1542 120.384 22.9405 120.6 22.6224C120.779 22.3019 120.923 21.8769 120.961 20.4208C121.067 14.954 121.067 12.1162 121.067 10.9433C121.067 9.63129 120.961 8.95539 120.672 8.60253C120.24 8.10555 119.77 8.06827 119.157 8.06827C119.012 8.06827 118.58 8.10555 118.473 8.10555C118.113 8.10555 117.969 7.81978 117.969 7.42965C117.969 6.93267 118.22 6.75624 118.58 6.75624C118.868 6.75624 120.131 6.89788 120.851 6.89788C121.716 6.89788 122.69 6.79103 123.05 6.79103C123.411 6.79103 123.627 6.96746 123.806 7.21595C125.322 9.1343 126.293 10.2699 128.42 12.7175C130.331 14.8844 131.989 16.6934 134.26 19.1783C134.367 19.32 134.476 19.4268 134.583 19.4268C134.692 19.4268 134.727 19.32 134.727 19.2131C134.764 17.9359 134.764 16.8723 134.764 15.6994C134.764 13.9973 134.692 12.8592 134.62 11.085C134.548 9.63129 134.439 8.9206 134.295 8.63732C134.078 8.28198 133.574 8.06827 132.925 8.06827C132.744 8.06827 132.24 8.10555 132.133 8.10555C131.772 8.10555 131.556 7.81978 131.556 7.46444C131.556 7.07431 131.7 6.75624 132.168 6.75624C132.384 6.75624 133.9 6.89788 135.701 6.89788C137.214 6.89788 138.33 6.75624 138.584 6.75624C139.051 6.75624 139.197 7.00473 139.197 7.42965C139.197 7.81978 139.016 8.10555 138.69 8.10555C138.512 8.10555 138.151 8.06827 137.97 8.06827C137.214 8.06827 136.961 8.24719 136.745 8.53047C136.494 8.81375 136.35 9.59401 136.312 11.085C136.278 12.0789 136.278 13.9252 136.278 16.1268C136.278 21.8769 136.457 23.8301 136.457 24.1829C136.457 24.5731 136.24 24.8936 135.736 24.8936C135.269 24.8936 135.053 24.7172 134.943 24.5383C134.223 23.6512 133.574 22.7641 132.925 22.0186C129.573 18.1844 126.293 14.4222 123.157 10.8737C123.05 10.7669 122.978 10.6948 122.797 10.6948C122.69 10.6948 122.653 10.7669 122.653 10.9433C122.653 12.5759 122.618 13.8184 122.618 15.451C122.618 17.1208 122.618 18.6813 122.653 20.4208C122.69 21.9117 122.906 22.4087 123.157 22.692Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M149.867 13.0038C149.867 5.83236 154.516 0.579254 162.841 0.579254C166.265 0.579254 167.995 1.18309 169.436 1.50116C169.978 1.60801 170.338 1.89377 170.373 2.42554C170.445 4.12771 170.842 6.29455 170.842 6.89839C170.842 7.39537 170.482 7.5718 170.012 7.5718C169.58 7.5718 169.329 7.39537 169.257 7.10961C169.004 5.79757 168.571 4.55512 167.923 3.80964C167.13 2.92253 165.905 2.10499 162.227 2.10499C157.183 2.10499 153.217 5.58387 153.217 12.6112C153.217 18.8955 156.641 23.2963 162.587 23.2963C165.579 23.2963 167.093 22.3372 168.067 21.3457C168.825 20.5629 169.329 19.5342 169.796 18.3638C169.906 18.0432 170.122 17.8668 170.554 17.8668C171.021 17.8668 171.275 18.0432 171.275 18.3986C171.275 18.9651 170.733 21.4153 170.229 22.3372C169.94 22.8714 169.473 23.2268 168.969 23.4752C167.381 24.2555 165.689 24.8593 162.371 24.8593C153.975 24.8593 149.867 19.641 149.867 13.0038Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M179.675 22.692C179.926 22.9778 180.251 23.1542 181.116 23.1542C181.223 23.1542 181.655 23.1194 181.872 23.1194C182.232 23.1194 182.376 23.4375 182.376 23.758C182.376 24.0786 182.232 24.5035 181.872 24.5035C181.586 24.5035 179.71 24.3271 178.017 24.3271C176.285 24.3271 174.521 24.5035 174.268 24.5035C173.873 24.5035 173.729 24.2202 173.729 23.7928C173.729 23.4375 173.873 23.1194 174.196 23.1194C174.34 23.1194 174.7 23.1542 174.809 23.1542C175.565 23.1542 176.035 22.9405 176.251 22.6224C176.467 22.3019 176.646 21.6284 176.646 20.2096V11.0502C176.646 9.63129 176.502 8.99266 176.285 8.63732C176.107 8.31677 175.602 8.10555 174.954 8.10555C174.772 8.10555 174.377 8.14034 174.161 8.14034C173.979 8.14034 173.729 7.92663 173.729 7.50171C173.729 7.00473 173.945 6.75624 174.268 6.75624C174.556 6.75624 176.251 6.93267 177.98 6.93267C179.71 6.93267 181.511 6.75624 181.765 6.75624C182.197 6.75624 182.341 7.03952 182.341 7.42965C182.341 7.85457 182.197 8.14034 181.765 8.14034C181.693 8.14034 181.26 8.10555 181.151 8.10555C180.251 8.10555 179.926 8.24719 179.675 8.56526C179.459 8.84854 179.277 9.48965 179.277 11.1222V13.7836C179.277 14.3526 179.459 14.529 181.116 14.529H187.927C189.152 14.529 189.406 14.4222 189.406 13.6071V11.085C189.406 9.66607 189.224 8.95539 189.046 8.63732C188.829 8.31677 188.36 8.10555 187.676 8.10555C187.532 8.10555 187.172 8.14034 186.956 8.14034C186.737 8.14034 186.486 7.92663 186.486 7.50171C186.486 7.00473 186.702 6.75624 187.063 6.75624C187.351 6.75624 189.008 6.93267 190.738 6.93267C192.47 6.93267 194.234 6.75624 194.522 6.75624C194.92 6.75624 195.064 7.03952 195.064 7.42965C195.064 7.85457 194.955 8.14034 194.522 8.14034C194.415 8.14034 194.018 8.10555 193.911 8.10555C192.974 8.10555 192.649 8.24719 192.432 8.56526C192.216 8.84854 192.037 9.55922 192.037 11.085V20.1723C192.037 21.698 192.216 22.446 192.432 22.692C192.686 22.9778 193.009 23.1542 193.874 23.1542C193.983 23.1542 194.415 23.1194 194.632 23.1194C194.955 23.1194 195.099 23.4375 195.099 23.758C195.099 24.0786 194.992 24.5035 194.632 24.5035C194.343 24.5035 192.432 24.3271 190.738 24.3271C189.046 24.3271 187.279 24.5035 186.991 24.5035C186.63 24.5035 186.451 24.2202 186.451 23.7928C186.451 23.4375 186.63 23.1194 186.956 23.1194C187.063 23.1194 187.46 23.1542 187.567 23.1542C188.325 23.1542 188.792 22.9405 189.008 22.6224C189.19 22.3019 189.406 21.6284 189.406 20.2096V16.7655C189.406 16.1268 189.296 15.9852 187.965 15.9852H181.151C179.315 15.9852 179.277 16.1964 179.277 16.7655V20.1723C179.277 21.698 179.494 22.446 179.675 22.692Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M200.433 22.444C200.433 22.941 200.83 23.1199 202.02 23.1199C202.237 23.1199 202.669 23.0826 202.813 23.0826C203.173 23.0826 203.318 23.3336 203.318 23.7237C203.318 24.0791 203.28 24.504 202.813 24.504C202.525 24.504 200.288 24.3624 199.135 24.3624C197.982 24.3624 196.867 24.504 196.541 24.504C196.109 24.504 196.002 24.1487 196.002 23.8306C196.002 23.4032 196.146 23.0826 196.469 23.0826C196.613 23.0826 196.795 23.1199 197.011 23.1199C197.299 23.1199 197.876 23.0131 198.164 22.5857C198.415 22.1955 198.812 21.5917 199.352 20.3517C201.228 16.0901 203.39 11.2644 204.543 8.77948C204.649 8.4962 204.831 7.89236 204.868 7.53702C204.903 7.25374 205.012 7.07483 205.263 6.96798C205.733 6.71948 206.598 6.47099 206.886 6.47099C207.065 6.47099 207.209 6.57784 207.281 6.82634C207.39 7.07483 207.497 7.46496 207.895 8.38935C208.506 9.94987 209.734 12.9318 212.832 20.3517C213.409 21.7706 213.697 22.2676 213.985 22.6229C214.239 22.941 214.706 23.1199 215.176 23.1199C215.32 23.1199 215.464 23.0826 215.608 23.0826C215.896 23.0826 216.112 23.3684 216.112 23.7933C216.112 24.2555 215.931 24.504 215.643 24.504C215.32 24.504 213.553 24.3624 212.363 24.3624C211.21 24.3624 208.434 24.504 208.183 24.504C207.857 24.504 207.679 24.1487 207.679 23.7933C207.679 23.438 207.785 23.0826 208.146 23.0826C208.255 23.0826 208.615 23.1199 208.722 23.1199C210.022 23.1199 210.561 22.8714 210.561 22.3396C210.561 21.9122 210.417 21.4873 209.985 20.3517L209.264 18.6123C209.01 17.9364 208.832 17.76 208.255 17.76H202.776C202.271 17.76 202.055 18.0084 201.876 18.4706L201.118 20.3144C200.651 21.45 200.433 22.0539 200.433 22.444ZM202.885 16.0901C202.885 16.4106 203.101 16.4454 203.857 16.4454H207.425C208.039 16.4454 208.255 16.3759 208.255 16.0901C208.255 15.9485 208.146 15.7 208.074 15.4887L205.877 10.2704C205.805 10.0567 205.733 9.98466 205.624 9.98466C205.551 9.98466 205.479 10.0915 205.373 10.34L203.101 15.4515C203.029 15.6652 202.885 15.9857 202.885 16.0901Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M229.305 19.7102C229.305 22.8362 226.78 24.9285 222.744 24.9285C220.761 24.9285 218.851 24.3968 218.058 23.8998C217.77 23.7582 217.481 23.5097 217.447 23.1543C217.337 21.7702 217.121 20.3141 217.121 19.996C217.121 19.6406 217.375 19.3922 217.879 19.3922C218.311 19.3922 218.49 19.6059 218.565 19.9239C218.709 20.7763 218.923 21.5217 219.43 22.1951C219.934 22.871 221.447 23.5444 222.851 23.5444C225.555 23.5444 226.961 22.4088 226.961 20.4557C226.961 19.1089 226.025 18.3261 224.295 17.4042L221.664 16.0549C219.104 14.7429 217.916 13.3588 217.916 11.1224C217.916 8.17526 220.473 6.40103 224.114 6.40103C225.771 6.40103 226.927 6.64952 227.826 6.89801C228.44 7.10923 228.8 7.42979 228.835 7.78513C228.907 8.5306 229.088 10.695 229.088 10.8366C229.088 11.1572 228.763 11.3336 228.44 11.3336C228.005 11.3336 227.791 11.1224 227.754 10.8739C227.645 10.198 227.356 9.27608 226.961 8.77909C226.492 8.14047 225.555 7.75034 224.079 7.75034C221.482 7.75034 220.257 8.88594 220.257 10.4465C220.257 11.6541 220.871 12.5065 222.779 13.4632L225.304 14.7777C227.97 16.127 229.305 17.3322 229.305 19.7102Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M237.811 24.3618C236.082 24.3618 233.125 24.5035 232.801 24.5035C232.476 24.5035 232.26 24.3271 232.26 23.8301C232.26 23.3306 232.476 23.1194 232.729 23.1194C232.874 23.1194 233.269 23.1542 233.413 23.1542C234.171 23.1542 234.603 22.9405 234.782 22.6224C234.963 22.3391 235.18 21.698 235.18 20.3139V11.0154C235.18 9.63128 235.035 8.95539 234.819 8.63732C234.638 8.31677 234.171 8.10555 233.45 8.10555C233.306 8.10555 232.908 8.14034 232.764 8.14034C232.404 8.14034 232.26 7.89185 232.26 7.46444C232.26 7.07431 232.404 6.75624 232.836 6.75624C233.125 6.75624 235.935 6.89788 237.739 6.89788C241.847 6.89788 243.469 6.75624 245.38 6.75624C245.668 6.75624 245.885 6.89788 245.885 7.3228C245.885 8.42362 245.957 10.588 245.957 10.7669C245.957 11.0154 245.74 11.1918 245.415 11.1918C244.983 11.1918 244.732 11.0154 244.694 10.7669C244.657 9.91456 244.443 9.24115 244.008 8.77896C243.504 8.28198 242.711 8.24719 241.163 8.24719C240.371 8.24719 238.999 8.24719 238.315 8.31677C237.955 8.35155 237.811 8.53047 237.811 9.02745V13.9252C237.811 14.4943 238.134 14.5638 238.855 14.5638C240.08 14.5638 240.947 14.4222 241.342 14.3153C241.812 14.1041 242.172 13.7488 242.316 12.4691C242.351 12.223 242.567 12.0441 242.965 12.0441C243.253 12.0441 243.541 12.1858 243.541 12.4691C243.541 12.7175 243.36 14.2458 243.36 15.3814C243.36 16.3033 243.469 17.4041 243.469 17.9011C243.469 18.08 243.288 18.326 242.821 18.326C242.46 18.326 242.316 18.1496 242.279 17.9359C242.172 16.6586 241.775 16.2685 241.451 16.0896C241.126 15.9131 239.936 15.8411 238.748 15.8411C237.955 15.8411 237.811 15.9852 237.811 16.4822V20.7761C237.811 21.4147 237.918 22.0186 238.062 22.3019C238.422 22.9405 239.575 23.0473 241.74 23.0473C243.253 23.0473 244.153 22.9405 244.732 22.5503C245.38 22.0882 245.812 21.3452 246.136 20.2791C246.208 20.0306 246.424 19.8542 246.749 19.8542C247.11 19.8542 247.433 19.9586 247.433 20.3139C247.433 20.6345 246.893 22.8336 246.64 23.686C246.461 24.1829 246.136 24.5035 245.668 24.5035C242.965 24.5035 241.414 24.3618 237.811 24.3618Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.8164 0.114578H139.794V1.60553H18.8164V0.114578Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M175.312 0.114578H247.852V1.60553H175.312V0.114578Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M247.961 31.8076H1.17711C0.765365 31.8076 0.431641 31.4739 0.431641 31.0621C0.431641 30.6504 0.765365 30.3167 1.17711 30.3167H247.961C248.373 30.3167 248.707 30.6504 248.707 31.0621C248.707 31.4739 248.373 31.8076 247.961 31.8076Z" fill="currentColor"/>
</svg>`;

/* ------------------------------------------------------------------ */
/*  Global BD Visibility Layer — Portal shell                          */
/*  Data model aligned to the Ezekia API mapping:                      */
/*   - logo = company.image { url, color } (monogram is the fallback)  */
/*   - assignments + opportunities are one `projects` list, split by   */
/*     dataType (mirrors Ezekia projects)                              */
/*   - entity.region is DERIVED from country                           */
/*   - row links deep-link to ezekia.com/#/{person|company|project}/id */
/*   - revenue is currency-aware (families span currencies → FX norm)  */
/*  Read-only aggregation over Ezekia. Mock data grounded in the brief.*/
/* ------------------------------------------------------------------ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Sans:wght@600&display=swap');

:root[data-theme="light"] {
  --bg: #F6F7F9; --surface: #FFFFFF; --surface-2: #EEF1F4;
  --border: #E2E6EB; --border-strong: #CDD3DB;
  --text: #12151A; --text-muted: #626B78; --text-faint: #9AA2AE;
  --accent: #1054CC; --accent-hover: #0D44A6; --accent-soft: #E7EEFB;
  --red: #C6304C; --red-soft: #FBE7EA; --green: #2E8B57; --amber: #B7791F; --amber-soft: #FBF1DD;
  --shadow: 0 1px 2px rgba(18,21,26,.04), 0 8px 24px -12px rgba(18,21,26,.18);
  --side: #FBFCFD;
}
:root[data-theme="dark"] {
  --bg: #0B0D11; --surface: #14181F; --surface-2: #1C222B;
  --border: #262D38; --border-strong: #333C49;
  --text: #EAEDF2; --text-muted: #8A93A1; --text-faint: #5C6472;
  --accent: #5B8DF0; --accent-hover: #7BA4F4; --accent-soft: rgba(91,141,240,.14);
  --red: #FF6B82; --red-soft: rgba(255,107,130,.12); --green: #4ADE80; --amber: #E3B341; --amber-soft: rgba(227,179,65,.12);
  --shadow: 0 1px 2px rgba(0,0,0,.4), 0 12px 30px -14px rgba(0,0,0,.7);
  --side: #0E1116;
}

* { box-sizing: border-box; }
.gbd { font-family: 'Inter', system-ui, sans-serif; color: var(--text); background: var(--bg); -webkit-font-smoothing: antialiased; }
.gbd-display { font-family: 'Instrument Sans', 'Inter', sans-serif; font-weight: 600; }
.gbd button { font-family: inherit; color: inherit; cursor: pointer; }
.gbd :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 6px; }

/* shell */
.shell { display: flex; min-height: 100vh; }
.sidebar { width: 244px; flex-shrink: 0; background: var(--side); border-right: 1px solid var(--border);
  position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; padding: 18px 14px; }
.side-brand { display: flex; flex-direction: column; gap: 2px; padding: 6px 10px 20px; }
.side-brand .mark { font-family: 'Instrument Sans'; font-weight: 600; font-size: 16px; letter-spacing: -.01em; }
.side-brand .sub { font-size: 10.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--text-faint); font-weight: 600; }
.brand-logo { display: block; color: #1054CC; padding: 2px 0 4px; }
.brand-logo svg { width: 100%; max-width: 172px; height: auto; display: block; }
:root[data-theme="dark"] .brand-logo { color: #fff; }
.nav-group-label { font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-faint); font-weight: 600; padding: 14px 10px 8px; }
.nav-item { display: flex; align-items: center; gap: 11px; width: 100%; border: 0; background: transparent; color: var(--text-muted);
  font-size: 14px; font-weight: 500; padding: 9px 10px; border-radius: 9px; text-align: left; transition: background .12s, color .12s; }
.nav-item:hover { background: var(--surface-2); color: var(--text); }
.nav-item.on { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
.nav-item.on svg { color: var(--accent); }
.nav-item svg { flex-shrink: 0; color: var(--text-faint); }
.nav-item.on:hover { background: var(--accent-soft); }
.nav-item .grow { flex: 1; }
.v2-tag { font-size: 9.5px; font-weight: 700; letter-spacing: .05em; color: var(--text-faint); border: 1px solid var(--border-strong); border-radius: 5px; padding: 1px 5px; }
.side-foot { margin-top: auto; padding: 12px 10px 4px; border-top: 1px solid var(--border); }
.access { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: var(--text-muted); }
.avatar { width: 28px; height: 28px; border-radius: 7px; background: var(--accent); color: #fff; display: grid; place-items: center; font-size: 12px; font-weight: 600; font-family: 'Instrument Sans'; }
.access .role { font-size: 11px; color: var(--text-faint); }

/* main */
.main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.topbar { display: flex; align-items: center; gap: 14px; padding: 14px 26px; border-bottom: 1px solid var(--border); background: var(--surface); position: sticky; top: 0; z-index: 30; }
.menu-btn { display: none; width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); place-items: center; }
.topbar-title { font-weight: 600; font-size: 15px; }
.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.readonly { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--text-muted); border: 1px solid var(--border); border-radius: 999px; padding: 5px 11px; font-weight: 500; }
.readonly .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }
.theme-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); display: grid; place-items: center; }
.theme-btn:hover { color: var(--text); border-color: var(--border-strong); }
.page { flex: 1; padding: 26px 34px 80px; width: 100%; }
.page-head { margin-bottom: 22px; }
.page-head h1 { font-family: 'Instrument Sans'; font-weight: 600; font-size: 26px; letter-spacing: -.02em; margin: 0; }
.page-head p { color: var(--text-muted); font-size: 14.5px; margin: 7px 0 0; line-height: 1.5; max-width: 620px; }

/* search */
.search-wrap { position: relative; max-width: 400px; margin-bottom: 26px; }
.search-box { display: flex; align-items: center; gap: 9px; background: var(--surface); border: 1px solid var(--border-strong);
  border-radius: 10px; padding: 0 12px; box-shadow: var(--shadow); transition: border-color .15s; }
.search-box.open { border-radius: 10px 10px 0 0; }
.search-box:focus-within { border-color: var(--accent); }
.search-box svg { color: var(--text-faint); flex-shrink: 0; }
.search-box input { flex: 1; border: 0; background: transparent; color: var(--text); font-size: 14px; padding: 10px 0; outline: none; font-family: inherit; }
.search-box input::placeholder { color: var(--text-faint); }
.results { position: absolute; left: 0; right: 0; top: 100%; background: var(--surface); border: 1px solid var(--border-strong); border-top: 0; border-radius: 0 0 10px 10px; box-shadow: var(--shadow); overflow: hidden; z-index: 20; }
.result { display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-top: 1px solid var(--border); background: transparent; width: 100%; border-left: 0; border-right: 0; border-bottom: 0; text-align: left; }
.result:first-child { border-top: 0; }
.result.active, .result:hover { background: var(--surface-2); }
.result-main { flex: 1; min-width: 0; }
.result-name { font-family: 'Instrument Sans'; font-weight: 600; font-size: 14px; }
.result-name mark { background: transparent; color: var(--accent); font-weight: 700; }
.result-meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.result-regions { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 5px; }
.mini-chip { font-size: 10px; color: var(--text-muted); background: var(--surface-2); border: 1px solid var(--border); border-radius: 5px; padding: 1px 6px; font-weight: 500; }
.count-pill { font-size: 11.5px; font-weight: 600; color: var(--accent); background: var(--accent-soft); border-radius: 7px; padding: 5px 9px; white-space: nowrap; }
.no-results { padding: 16px 12px; color: var(--text-muted); font-size: 13.5px; }
.no-results b { color: var(--text); }

/* logo / avatar tiles (company.image or monogram fallback) */
.logo-tile { display: grid; place-items: center; font-family: 'Instrument Sans'; font-weight: 600; color: #fff; flex-shrink: 0; letter-spacing: -.03em; text-transform: uppercase; overflow: hidden; }
.logo-lg { width: 56px; height: 56px; font-size: 20px; border-radius: 14px; }
.logo-sm { width: 34px; height: 34px; font-size: 13px; border-radius: 9px; }
.logo-xs { width: 24px; height: 24px; font-size: 10.5px; border-radius: 7px; }

/* empty state */
.empty-state { border: 1px dashed var(--border-strong); border-radius: 14px; padding: 44px 28px; text-align: center; background: var(--surface); }
.empty-state .es-title { font-family: 'Instrument Sans'; font-weight: 600; font-size: 18px; }
.empty-state .es-sub { color: var(--text-muted); font-size: 14px; margin: 8px auto 22px; max-width: 400px; line-height: 1.5; }
.coming-soon { margin-top: 4px; }
.coming-soon .cs-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--accent-soft); color: var(--accent); display: grid; place-items: center; margin: 0 auto 16px; }
.coming-soon .es-sub { margin-bottom: 0; }
.flagship-label { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-faint); font-weight: 600; margin-bottom: 12px; }
.flagship { display: flex; flex-wrap: wrap; gap: 9px; justify-content: center; }
.flag-chip { display: inline-flex; align-items: center; gap: 8px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 9px; padding: 8px 13px; font-weight: 600; font-size: 13.5px; color: var(--text); }
.flag-chip:hover { border-color: var(--accent); color: var(--accent); }
.flag-chip .fc-n { font-size: 11px; font-weight: 500; color: var(--text-faint); }

/* practice groups — dropdown multi-select */
.ms-wrap { position: relative; max-width: 400px; margin-bottom: 20px; }
.ms-trigger { display: flex; align-items: center; gap: 9px; width: 100%; background: var(--surface); border: 1px solid var(--border-strong); border-radius: 10px; padding: 11px 12px; box-shadow: var(--shadow); color: var(--text); font-size: 14px; }
.ms-trigger.open { border-radius: 10px 10px 0 0; border-color: var(--accent); }
.ms-trigger svg { color: var(--text-faint); flex-shrink: 0; }
.ms-label { flex: 1; text-align: left; }
.ms-label.ph { color: var(--text-faint); }
.ms-chev { transition: transform .15s; }
.ms-trigger.open .ms-chev { transform: rotate(180deg); }
.ms-panel { position: absolute; left: 0; right: 0; top: 100%; background: var(--surface); border: 1px solid var(--accent); border-top: 0; border-radius: 0 0 10px 10px; box-shadow: var(--shadow); z-index: 20; overflow: hidden; }
.ms-search { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-bottom: 1px solid var(--border); }
.ms-search svg { color: var(--text-faint); }
.ms-search input { flex: 1; border: 0; background: transparent; color: var(--text); font-size: 13.5px; outline: none; font-family: inherit; }
.ms-list { max-height: 300px; overflow-y: auto; padding: 6px; }
.ms-opt { display: flex; align-items: center; gap: 10px; width: 100%; border: 0; background: transparent; text-align: left; padding: 8px 10px; border-radius: 8px; font-size: 13.5px; color: var(--text); }
.ms-opt:hover { background: var(--surface-2); }
.ms-opt.cat { font-family: 'Instrument Sans'; font-weight: 600; }
.ms-opt.sub { padding-left: 28px; color: var(--text-muted); font-weight: 500; }
.ms-check { width: 16px; height: 16px; border-radius: 5px; border: 1.5px solid var(--border-strong); display: grid; place-items: center; flex-shrink: 0; color: #fff; }
.ms-check.on { background: var(--accent); border-color: var(--accent); }
.ms-check svg { width: 11px; height: 11px; }
.ms-empty { padding: 16px; text-align: center; color: var(--text-muted); font-size: 13.5px; }

/* news feed */
.news-list { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--surface); }
.news-item { display: block; padding: 14px 16px; border-top: 1px solid var(--border); text-decoration: none; color: var(--text); }
.news-item:first-child { border-top: 0; }
.news-item:hover { background: var(--surface-2); }
.news-title { font-weight: 600; font-size: 14px; line-height: 1.4; }
.news-item:hover .news-title { color: var(--accent); }
.news-meta { font-size: 12px; color: var(--text-muted); margin-top: 4px; }
.news-all { display: inline-block; margin-top: 14px; color: var(--accent); font-weight: 600; font-size: 13px; text-decoration: none; }
.news-all:hover { text-decoration: underline; }

/* signals */
.sig-group { margin-bottom: 24px; }
.sig-group:last-child { margin-bottom: 0; }
.sig-head { margin-bottom: 10px; }
.sh-title { font-family: 'Instrument Sans'; font-weight: 600; font-size: 15px; display: flex; align-items: center; gap: 8px; }
.sh-count { font-size: 12px; color: var(--text-faint); font-weight: 500; }
.sh-desc { font-size: 12px; color: var(--text-faint); margin-top: 3px; }
.sig-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
.sig-dot.leadership { background: var(--accent); }
.sig-dot.hiring { background: var(--green); }
.sig-dot.capital { background: var(--amber); }
.sig-list { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--surface); }
.sig-item { display: flex; gap: 12px; align-items: flex-start; padding: 13px 16px; border-top: 1px solid var(--border); text-decoration: none; color: var(--text); }
.sig-item:first-child { border-top: 0; }
.sig-item:hover { background: var(--surface-2); }
.sig-kind { flex-shrink: 0; font-size: 11px; font-weight: 700; letter-spacing: .02em; border-radius: 6px; padding: 3px 8px; margin-top: 1px; white-space: nowrap; }
.sig-kind.leadership { color: var(--accent); background: var(--accent-soft); }
.sig-kind.hiring { color: var(--green); background: color-mix(in srgb, var(--green) 14%, transparent); }
.sig-kind.capital { color: var(--amber); background: var(--amber-soft); }
.sig-body { flex: 1; min-width: 0; }
.sig-text { font-size: 14px; font-weight: 500; line-height: 1.4; }
.sig-item:hover .sig-text { color: var(--accent); }
.sig-new { font-size: 9.5px; font-weight: 700; letter-spacing: .04em; color: #fff; background: var(--red); border-radius: 4px; padding: 1px 5px; margin-left: 7px; vertical-align: middle; }
.sig-meta { font-size: 12px; color: var(--text-muted); margin-top: 5px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.sig-empty { padding: 14px 16px; color: var(--text-muted); font-size: 13px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); }

/* aggregate signals feed */
.agg-controls { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.agg-controls .search-wrap { flex: 1; min-width: 240px; max-width: 420px; margin-bottom: 0; }
.agg-list { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--surface); }
.agg-item { display: flex; gap: 12px; align-items: flex-start; padding: 14px 16px; border-top: 1px solid var(--border); }
.agg-item:first-child { border-top: 0; }
.agg-item:hover { background: var(--surface-2); }
.agg-text { font-size: 14px; font-weight: 500; line-height: 1.4; color: var(--text); text-decoration: none; }
.agg-text:hover { color: var(--accent); text-decoration: underline; }
.agg-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 6px; font-size: 12px; color: var(--text-muted); }
.company-link.sm { font-size: 12.5px; }
.agg-dot { color: var(--text-faint); }
.ctrl { display: flex; align-items: center; gap: 8px; }
.ctrl-label { font-size: 12px; color: var(--text-muted); font-weight: 600; white-space: nowrap; }
.acct-block { margin-bottom: 16px; }
.acct-block:last-child { margin-bottom: 0; }
.acct-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.acct-rank { font-family: 'Instrument Sans'; font-weight: 600; font-size: 13px; color: var(--text-faint); min-width: 20px; }
.score-badge { margin-left: auto; font-family: 'Instrument Sans'; font-weight: 600; font-size: 12.5px; color: var(--accent); background: var(--accent-soft); border-radius: 8px; padding: 4px 10px; white-space: nowrap; }
.acct-list { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--surface); }
.sel-summary { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; font-size: 13px; color: var(--text-muted); }
.sel-chip { display: inline-flex; align-items: center; gap: 4px; background: var(--accent-soft); color: var(--accent); border-radius: 999px; padding: 3px 5px 3px 11px; font-size: 12.5px; font-weight: 600; }
.sel-chip button { border: 0; background: transparent; color: var(--accent); display: grid; place-items: center; padding: 2px; border-radius: 50%; line-height: 0; font-size: 12px; }
.sel-chip button:hover { background: color-mix(in srgb, var(--accent) 22%, transparent); }
.sel-clear { border: 0; background: transparent; color: var(--text-muted); font-weight: 600; font-size: 12.5px; text-decoration: underline; padding: 0; }
.cat-sub { margin-top: 4px; font-size: 12px; color: var(--text-faint); }

/* company view */
.selected-note { font-size: 12.5px; color: var(--text-muted); margin: -8px 0 20px; }
.selected-note button { border: 0; background: transparent; color: var(--accent); font-weight: 600; font-size: 12.5px; padding: 0; }
.co-head { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 20px 40px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
.co-ident { display: flex; align-items: center; gap: 16px; }
.co-title h2 { font-family: 'Instrument Sans'; font-weight: 600; font-size: clamp(26px,4vw,36px); letter-spacing: -.02em; margin: 0; line-height: 1; }
.co-sub { color: var(--text-muted); font-size: 14px; margin-top: 10px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.co-sub .sep { color: var(--text-faint); }
.badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; border-radius: 999px; padding: 4px 11px; }
.badge.limit { color: var(--red); background: var(--red-soft); }
.badge.limit .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); }
.co-stats { display: flex; gap: 30px; margin-left: auto; }
.stat .n { font-family: 'Instrument Sans'; font-weight: 600; font-size: 28px; line-height: 1; letter-spacing: -.01em; }
.stat .l { font-size: 11.5px; color: var(--text-muted); margin-top: 5px; }

/* family scope selector */
.family { margin-top: 22px; }
.family-label { font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-faint); font-weight: 600; margin-bottom: 11px; }
.family-chips { display: flex; flex-wrap: wrap; gap: 9px; }
.fchip { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 9px 13px; text-align: left; transition: border-color .12s, background .12s; animation: assemble .45s cubic-bezier(.16,.8,.3,1) backwards; }
.fchip:hover { border-color: var(--border-strong); }
.fchip.sel { border-color: var(--accent); background: var(--accent-soft); }
.fchip.global .flabel { display: flex; align-items: center; gap: 7px; }
@keyframes assemble { from { opacity: 0; transform: translateY(8px) scale(.97); } to { opacity: 1; transform: none; } }
.fchip .flabel { font-weight: 600; font-size: 13.5px; }
.fchip .floc { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
.fchip .hqtag { font-size: 10px; font-weight: 700; letter-spacing: .06em; color: var(--accent); background: var(--accent-soft); border-radius: 4px; padding: 1px 5px; }
.fchip.sel .hqtag { background: var(--surface); }
.dotmark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
.scope-line { display: flex; align-items: center; gap: 8px; margin-top: 18px; font-size: 13px; color: var(--text-muted); flex-wrap: wrap; }
.scope-line strong { color: var(--text); font-weight: 600; }
.scope-line .clear { border: 0; background: transparent; color: var(--accent); font-weight: 600; font-size: 12.5px; padding: 0; }

/* tabs */
.tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
.tab { background: transparent; border: 1px solid var(--border); border-radius: 8px; color: var(--text-muted); font-size: 14px; font-weight: 500; padding: 8px 13px; white-space: nowrap; }
.tab:hover { color: var(--text); border-color: var(--border-strong); }
.tab.on { color: var(--accent); background: var(--accent-soft); border-color: var(--accent); font-weight: 600; }
.tab .tcount { font-size: 11px; color: var(--text-faint); margin-left: 6px; font-weight: 500; }
.tab.on .tcount { color: var(--accent); }
.tab .v2-tag { margin-left: 6px; vertical-align: middle; }
.panel { padding-top: 26px; animation: fade .25s ease; }
@keyframes fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
.card { position: relative; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 18px; }
button.card { font-family: inherit; text-align: left; width: 100%; display: block; }
.card.clickable { cursor: pointer; transition: border-color .12s, transform .12s, box-shadow .12s; }
.card.clickable:hover { border-color: var(--accent); transform: translateY(-1px); box-shadow: var(--shadow); }
.card-go { position: absolute; top: 14px; right: 14px; color: var(--text-faint); opacity: 0; transition: opacity .12s; }
.card.clickable:hover .card-go { opacity: 1; color: var(--accent); }
.card .ct { font-size: 12px; color: var(--text-muted); font-weight: 500; }
.card .cv { font-family: 'Instrument Sans'; font-weight: 600; font-size: 22px; margin-top: 8px; letter-spacing: -.01em; }
.card .cd { font-size: 12.5px; color: var(--text-faint); margin-top: 4px; }

.tbl-wrap { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--surface); }
table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
thead th { text-align: left; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; padding: 12px 16px; background: var(--surface-2); border-bottom: 1px solid var(--border); }
tbody td { padding: 13px 16px; border-bottom: 1px solid var(--border); color: var(--text); vertical-align: top; }
tbody tr:last-child td { border-bottom: 0; }
tbody tr:hover td { background: var(--surface-2); }
.cell-strong { font-weight: 600; }
.cell-muted { color: var(--text-muted); }
.cell-num { font-family: 'Instrument Sans'; font-weight: 600; }
.link-cell { border: 0; background: transparent; color: var(--accent); font-weight: 600; font-size: 13.5px; padding: 0; font-family: inherit; }
.rec-link { color: var(--accent); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; }
.rec-link:hover { text-decoration: underline; }
.rec-link .ext { opacity: .5; flex-shrink: 0; }
.rec-link:hover .ext { opacity: 1; }
.company-link { display: inline-flex; align-items: center; gap: 9px; border: 0; background: transparent; color: var(--text); font-weight: 600; font-size: 13.5px; padding: 0; font-family: inherit; }
.company-link:hover { color: var(--accent); }
.company-link .go { opacity: 0; transition: opacity .12s; flex-shrink: 0; }
.company-link:hover .go { opacity: .85; }
.entity-tag { display: inline-block; font-size: 11.5px; font-weight: 600; color: var(--text-muted); background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; padding: 2px 8px; }
.pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; border-radius: 999px; padding: 3px 10px; }
.pill.active { color: var(--green); background: color-mix(in srgb, var(--green) 14%, transparent); }
.pill.progress { color: var(--accent); background: var(--accent-soft); }
.pill.closed { color: var(--text-muted); background: var(--surface-2); }
.pill.limit { color: var(--red); background: var(--red-soft); }
.pill.lost { color: var(--red); background: var(--red-soft); }
.pill.stale { color: var(--amber); background: var(--amber-soft); }
.empty { padding: 40px 16px; text-align: center; color: var(--text-muted); font-size: 14px; }
.section-note { font-size: 12.5px; color: var(--text-faint); margin: 0 0 14px; }

/* revenues */
.rev-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
.rt-label { font-size: 12.5px; color: var(--text-muted); font-weight: 500; }
.rt-value { font-family: 'Instrument Sans'; font-weight: 600; font-size: 34px; letter-spacing: -.02em; margin-top: 5px; line-height: 1; }
.rt-cap { font-size: 12.5px; color: var(--text-faint); margin-top: 6px; }
.rt-cur { font-size: 11.5px; color: var(--text-faint); margin-top: 3px; display: inline-flex; align-items: center; gap: 6px; }
.rt-cur .fx { border: 1px solid var(--border); border-radius: 5px; padding: 0 5px; font-weight: 600; color: var(--text-muted); }
.seg { display: inline-flex; background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; padding: 3px; gap: 2px; }
.seg button { border: 0; background: transparent; color: var(--text-muted); font-size: 13px; font-weight: 600; padding: 7px 15px; border-radius: 7px; }
.seg button.on { background: var(--surface); color: var(--text); box-shadow: var(--shadow); }
.chart-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 22px 20px 16px; }
.bars { display: flex; align-items: flex-end; gap: 8px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; min-width: 0; }
.bar-val { font-size: 9.5px; color: var(--text-muted); margin-bottom: 6px; white-space: nowrap; height: 13px; font-family: 'Instrument Sans'; font-weight: 600; }
.bar-track { height: 150px; width: 100%; display: flex; align-items: flex-end; justify-content: center; }
.bar-fill { width: 62%; max-width: 32px; min-height: 2px; border-radius: 5px 5px 0 0; transition: height .35s cubic-bezier(.16,.8,.3,1); }
.bar-fill.collected { background: var(--accent); }
.bar-fill.scheduled { background: var(--amber); }
.bar-month { font-size: 10.5px; color: var(--text-faint); margin-top: 9px; font-weight: 500; }
.bar-month.cur { color: var(--accent); font-weight: 700; }
.rev-legend { display: flex; gap: 16px; margin-top: 16px; font-size: 12px; color: var(--text-muted); flex-wrap: wrap; }
.rev-legend span { display: inline-flex; align-items: center; gap: 6px; }
.lg-dot { width: 9px; height: 9px; border-radius: 3px; }
.lg-dot.collected { background: var(--accent); }
.lg-dot.scheduled { background: var(--amber); }
@media (prefers-reduced-motion: reduce) { .bar-fill { transition: none; } }

.stub { border: 1px dashed var(--border-strong); border-radius: 14px; padding: 40px 28px; background: var(--surface); max-width: 640px; }
.stub .badge-v2 { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: .05em; color: var(--amber); background: var(--amber-soft); border-radius: 6px; padding: 3px 9px; margin-bottom: 14px; }
.stub h3 { font-family: 'Instrument Sans'; font-weight: 600; font-size: 18px; margin: 0 0 8px; }
.stub p { color: var(--text-muted); font-size: 14px; line-height: 1.55; margin: 0 0 14px; }
.stub ul { margin: 0; padding-left: 18px; color: var(--text-muted); font-size: 13.5px; line-height: 1.7; }

.backdrop { display: none; }
@media (max-width: 860px) {
  .sidebar { position: fixed; z-index: 60; transform: translateX(-100%); transition: transform .22s ease; box-shadow: var(--shadow); }
  .sidebar.open { transform: translateX(0); }
  .menu-btn { display: grid; }
  .backdrop.show { display: block; position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 55; }
  .co-stats { margin-left: 0; width: 100%; gap: 22px; flex-wrap: wrap; }
}
@media (max-width: 640px) {
  .page { padding: 20px 16px 64px; }
  .page-head h1 { font-size: 22px; }
  .search-box input, .ms-search input, .ms-trigger { font-size: 16px; }

  /* tables reflow into labeled cards */
  .tbl-wrap { border: 0; background: transparent; border-radius: 0; }
  .tbl-wrap table, .tbl-wrap tbody, .tbl-wrap tr, .tbl-wrap td { display: block; width: 100%; }
  .tbl-wrap thead { display: none; }
  .tbl-wrap tr { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 10px; overflow: hidden; }
  .tbl-wrap tr:hover td { background: transparent; }
  .tbl-wrap td { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 16px; align-items: baseline; padding: 9px 14px; border: 0; border-top: 1px solid var(--border); text-align: right; font-size: 13.5px; }
  .tbl-wrap td::before { content: attr(data-label); font-size: 11px; letter-spacing: .03em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; text-align: left; flex-shrink: 0; }
  .tbl-wrap td:first-child { justify-content: flex-start; border-top: 0; background: var(--surface-2); font-weight: 600; padding: 11px 14px; text-align: left; }
  .tbl-wrap td:first-child::before { display: none; }
  .cat-sub { text-align: left; width: 100%; }

  /* signals controls stack full-width */
  .agg-controls { flex-direction: column; align-items: stretch; gap: 10px; }
  .agg-controls .search-wrap { max-width: none; }
  .ctrl { justify-content: space-between; }
  .ctrl .seg { flex: 1; }
  .seg { display: flex; }
  .seg button { flex: 1; text-align: center; }

  /* revenue chart tightens */
  .bars { gap: 4px; }
  .bar-val { display: none; }
  .bar-month { font-size: 9px; }
  .rev-head { gap: 12px; }

  /* company header */
  .co-stats { gap: 18px; }
  .stat .n { font-size: 24px; }
}
@media (prefers-reduced-motion: reduce) { .fchip, .panel { animation: none !important; } }
`;

/* ------------------------------- data ------------------------------- */
/* entity.image mirrors Ezekia company.image {url,color}; url null in mock → monogram fallback.
   entity.region is NOT stored — derived from country (see regionOf).
   projects[] holds both assignments and opportunities, split by dataType, as Ezekia returns them. */
const COMPANIES = [
  { id: "nvidia", name: "NVIDIA", industry: "Semiconductors", website: "nvidia.com", offLimits: 1, staleMonths: 0,
    entities: [
      { key: "US", name: "NVIDIA Corporation", loc: "Santa Clara", country: "USA", hq: true, image: { url: null, color: "#2FA88F" } },
      { key: "Japan", name: "NVIDIA K.K.", loc: "Tokyo", country: "Japan" },
      { key: "Germany", name: "NVIDIA GmbH", loc: "Frankfurt", country: "Germany" },
      { key: "UK", name: "NVIDIA Ltd", loc: "London", country: "United Kingdom" },
      { key: "India", name: "NVIDIA India Pvt Ltd", loc: "Bangalore", country: "India" } ],
    contacts: [
      { name: "Priya Raman", title: "VP, Data Center Platforms", loc: "Santa Clara", div: "Data Center", entity: "US" },
      { name: "Kenji Watanabe", title: "MD, Japan Region", loc: "Tokyo", div: "Sales", entity: "Japan" },
      { name: "Lukas Brandt", title: "Head of Automotive", loc: "Frankfurt", div: "Automotive", entity: "Germany" },
      { name: "Sophie Aldridge", title: "Director, Enterprise", loc: "London", div: "Enterprise", entity: "UK" },
      { name: "Arjun Mehta", title: "GM, India Engineering", loc: "Bangalore", div: "R&D", entity: "India" } ],
    consultants: [
      { name: "David Kessler", office: "Baltimore", entity: "US", last: "3 days ago" },
      { name: "Aiko Tanaka", office: "Tokyo", entity: "Japan", last: "2 weeks ago" },
      { name: "Markus Hoffmann", office: "Frankfurt", entity: "Germany", last: "5 days ago" } ],
    projects: [
      { dataType: "assignment", title: "VP Data Center Sales", fn: "Sales", status: "Active", loc: "Santa Clara", date: "Jun 2026", entity: "US" },
      { dataType: "assignment", title: "Head of Automotive EMEA", fn: "General Mgmt", status: "In progress", loc: "Frankfurt", date: "May 2026", entity: "Germany" },
      { dataType: "assignment", title: "Director of AI Research", fn: "R&D", status: "Closed", loc: "Bangalore", date: "Feb 2026", entity: "India" },
      { dataType: "opportunity", title: "AI Infrastructure – Chief Architect", fn: "R&D", status: "Negotiation", value: 320000, date: "Aug 2026", entity: "US" },
      { dataType: "opportunity", title: "EMEA Automotive GM search", fn: "General Mgmt", status: "Proposal sent", value: 180000, date: "Jul 2026", entity: "Germany" },
      { dataType: "opportunity", title: "India R&D leadership scale-up", fn: "R&D", status: "Prospecting", value: 150000, date: "Sep 2026", entity: "India" },
      { dataType: "opportunity", title: "APJ Enterprise Sales VP", fn: "Sales", status: "Won", value: 210000, date: "Jun 2026", entity: "Japan" } ],
    activity: [
      { date: "07 Jul 2026", type: "Meeting", note: "Quarterly account review with Priya Raman", who: "David Kessler", entity: "US" },
      { date: "01 Jul 2026", type: "Call", note: "Intro call re: automotive search brief", who: "Markus Hoffmann", entity: "Germany" },
      { date: "24 Jun 2026", type: "Email", note: "Shared shortlist for VP Data Center role", who: "David Kessler", entity: "US" } ],
    placements: [
      { candidate: "Robert Nguyen", role: "SVP Global Operations", entity: "US", date: "Nov 2025" },
      { candidate: "Elena Fischer", role: "Director, EMEA Channel", entity: "Germany", date: "Aug 2025" } ],
    offLimitsList: [ { entity: "US", reason: "Active client — 12-month off-limits", until: "Mar 2027" } ],
    marketing: [
      { name: "Priya Raman", title: "VP, Data Center Platforms", entity: "US", list: "Semiconductor Leaders" },
      { name: "Sophie Aldridge", title: "Director, Enterprise", entity: "UK", list: "Semiconductor Leaders" },
      { name: "Arjun Mehta", title: "GM, India Engineering", entity: "India", list: "APAC Tech" } ] },

  { id: "nec", name: "NEC", industry: "Semiconductors · Electronics", website: "nec.com", offLimits: 0, staleMonths: 0,
    entities: [
      { key: "Japan", name: "NEC Corporation", loc: "Tokyo", country: "Japan", hq: true, image: { url: null, color: "#4C6EF5" } },
      { key: "US", name: "NEC Corporation of America", loc: "Irving, TX", country: "USA" } ],
    contacts: [
      { name: "Hiroshi Sato", title: "EVP, Semiconductor Solutions", loc: "Tokyo", div: "Semiconductors", entity: "Japan" },
      { name: "Grace Miller", title: "VP, Public Sector", loc: "Irving", div: "Government", entity: "US" } ],
    consultants: [
      { name: "Aiko Tanaka", office: "Tokyo", entity: "Japan", last: "1 month ago" },
      { name: "James Whitfield", office: "Baltimore", entity: "US", last: "3 weeks ago" } ],
    projects: [
      { dataType: "assignment", title: "Head of Semiconductor BU", fn: "General Mgmt", status: "Active", loc: "Tokyo", date: "Jun 2026", entity: "Japan" },
      { dataType: "assignment", title: "VP Federal Sales", fn: "Sales", status: "In progress", loc: "Irving", date: "Apr 2026", entity: "US" },
      { dataType: "opportunity", title: "Semiconductor BU – Head of Ops", fn: "General Mgmt", status: "Negotiation", value: 240000, date: "Jul 2026", entity: "Japan" },
      { dataType: "opportunity", title: "US Federal practice build-out", fn: "Sales", status: "Proposal sent", value: 160000, date: "Aug 2026", entity: "US" } ],
    activity: [
      { date: "28 Jun 2026", type: "Meeting", note: "Briefing on semiconductor BU leadership search", who: "Aiko Tanaka", entity: "Japan" },
      { date: "15 Jun 2026", type: "Note", note: "Ownership: Japan record — Tokyo MD; US record — Baltimore", who: "James Whitfield", entity: "US" } ],
    placements: [ { candidate: "Takeshi Mori", role: "Director, Chip Design", entity: "Japan", date: "Oct 2025" } ],
    offLimitsList: [],
    marketing: [ { name: "Hiroshi Sato", title: "EVP, Semiconductor Solutions", entity: "Japan", list: "Semiconductor Leaders" } ] },

  { id: "intel", name: "Intel", industry: "Semiconductors", website: "intel.com", offLimits: 0, staleMonths: 7,
    entities: [
      { key: "US West", name: "Intel US West Coast", loc: "Santa Clara", country: "USA", hq: true, image: { url: null, color: "#3B82C4" } },
      { key: "Colorado", name: "Intel Colorado", loc: "Fort Collins", country: "USA" },
      { key: "Ireland", name: "Intel Ireland", loc: "Leixlip", country: "Ireland" },
      { key: "Israel", name: "Intel Israel", loc: "Haifa", country: "Israel" } ],
    contacts: [
      { name: "Diane Fowler", title: "VP, Foundry Services", loc: "Santa Clara", div: "Foundry", entity: "US West" },
      { name: "Ronan Kelly", title: "Site Director", loc: "Leixlip", div: "Manufacturing", entity: "Ireland" } ],
    consultants: [
      { name: "David Kessler", office: "Baltimore", entity: "US West", last: "7 months ago" },
      { name: "Ciara Byrne", office: "Dublin", entity: "Ireland", last: "8 months ago" } ],
    projects: [
      { dataType: "assignment", title: "VP Foundry Business Development", fn: "Sales", status: "Closed", loc: "Santa Clara", date: "Dec 2025", entity: "US West" },
      { dataType: "opportunity", title: "Foundry BD revival", fn: "Sales", status: "Prospecting", value: 140000, date: "Sep 2026", entity: "US West" },
      { dataType: "opportunity", title: "Ireland site leadership", fn: "Operations", status: "Lost", value: 90000, date: "Mar 2026", entity: "Ireland" } ],
    activity: [ { date: "02 Dec 2025", type: "Call", note: "Closed foundry BD leadership search", who: "David Kessler", entity: "US West" } ],
    placements: [],
    offLimitsList: [],
    marketing: [ { name: "Diane Fowler", title: "VP, Foundry Services", entity: "US West", list: "Semiconductor Leaders" } ] },

  { id: "philips", name: "Philips", industry: "Health Technology", website: "philips.com", offLimits: 0, staleMonths: 0,
    entities: [
      { key: "NL", name: "Koninklijke Philips N.V.", loc: "Amsterdam", country: "Netherlands", hq: true, image: { url: null, color: "#7C5CD3" } },
      { key: "US", name: "Philips North America", loc: "Cambridge, MA", country: "USA" } ],
    contacts: [ { name: "Anouk de Vries", title: "Chief Innovation Officer", loc: "Amsterdam", div: "Innovation", entity: "NL" } ],
    consultants: [ { name: "Sanne Bakker", office: "Amsterdam", entity: "NL", last: "1 week ago" } ],
    projects: [
      { dataType: "assignment", title: "Head of Digital Health", fn: "General Mgmt", status: "In progress", loc: "Amsterdam", date: "May 2026", entity: "NL" },
      { dataType: "opportunity", title: "Digital Health leadership retainer", fn: "General Mgmt", status: "Negotiation", value: 200000, date: "Jul 2026", entity: "NL" } ],
    activity: [ { date: "02 Jul 2026", type: "Meeting", note: "Digital health leadership discussion", who: "Sanne Bakker", entity: "NL" } ],
    placements: [],
    offLimitsList: [],
    marketing: [] },

  { id: "tsmc", name: "TSMC", industry: "Semiconductors", website: "tsmc.com", offLimits: 0, staleMonths: 0,
    entities: [
      { key: "TW", name: "TSMC (Taiwan)", loc: "Hsinchu", country: "Taiwan", hq: true, image: { url: null, color: "#C2603F" } },
      { key: "AZ", name: "TSMC Arizona", loc: "Phoenix", country: "USA" } ],
    contacts: [ { name: "Wei-Chen Lin", title: "SVP Advanced Technology", loc: "Hsinchu", div: "Technology", entity: "TW" } ],
    consultants: [ { name: "Grace Chen", office: "Taipei", entity: "TW", last: "4 days ago" } ],
    projects: [
      { dataType: "assignment", title: "Fab Operations Director", fn: "Operations", status: "Active", loc: "Phoenix", date: "Jun 2026", entity: "AZ" },
      { dataType: "opportunity", title: "Arizona fab expansion – Ops VP", fn: "Operations", status: "Won", value: 260000, date: "Jun 2026", entity: "AZ" },
      { dataType: "opportunity", title: "Taiwan advanced tech – R&D Director", fn: "R&D", status: "Proposal sent", value: 190000, date: "Aug 2026", entity: "TW" } ],
    activity: [ { date: "06 Jul 2026", type: "Call", note: "Arizona fab operations leadership brief", who: "Grace Chen", entity: "AZ" } ],
    placements: [],
    offLimitsList: [],
    marketing: [] },
];

const FLAGSHIP = ["nvidia", "intel", "tsmc", "nec"];
const CUR_MONTH = 6; // July 2026 (0-indexed)
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* region is derived from country (Ezekia has no geographic region on the company object) */
const COUNTRY_REGION = {
  "USA": "North America", "United States": "North America", "Canada": "North America", "Mexico": "North America",
  "United Kingdom": "EMEA", "Germany": "EMEA", "Ireland": "EMEA", "Israel": "EMEA", "Netherlands": "EMEA", "France": "EMEA",
  "Japan": "APAC", "India": "APAC", "Taiwan": "APAC", "China": "APAC", "Singapore": "APAC", "Australia": "APAC",
};
const regionOf = (country) => COUNTRY_REGION[country] || "Other";

/* deterministic per-entity monthly revenue so the demo is stable, not hand-typed */
function rng(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return function () { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
COMPANIES.forEach((c) => {
  c.revenue = {};
  c.entities.forEach((e) => {
    const r = rng(c.id + e.key);
    const base = (e.hq ? 260000 : 110000) + r() * 130000;
    const collected = [], scheduled = [];
    for (let m = 0; m < 12; m++) {
      const season = 0.65 + 0.7 * r();
      collected.push(m <= CUR_MONTH ? Math.round((base * season) / 1000) * 1000 : 0);
      scheduled.push(Math.round((base * (0.5 + 0.85 * r())) / 1000) * 1000);
    }
    c.revenue[e.key] = { collected, scheduled };
  });
});
/* practice groups — category → subcategories. Maps to Ezekia hierarchical industries / categories. */
const PRACTICES = [
  { category: "Technology", subs: ["Semiconductors", "Consumer Electronics", "Software & Cloud"] },
  { category: "Industrial", subs: ["Advanced Manufacturing", "Automotive"] },
  { category: "Life Sciences & Healthcare", subs: ["Medical Devices", "Digital Health"] },
  { category: "Financial Services", subs: ["Banking", "Fintech"] },
];
const COMPANY_PRACTICE = {
  nvidia: { category: "Technology", subcategory: "Semiconductors" },
  intel: { category: "Technology", subcategory: "Semiconductors" },
  tsmc: { category: "Technology", subcategory: "Semiconductors" },
  nec: { category: "Technology", subcategory: "Consumer Electronics" },
  philips: { category: "Life Sciences & Healthcare", subcategory: "Medical Devices" },
};
COMPANIES.forEach((c) => { c.practice = COMPANY_PRACTICE[c.id]; });
/* sample Google News items per family (backend replaces with parsed RSS) */
const NEWS = {
  nvidia: [
    { title: "Nvidia unveils next-gen data center GPU architecture at developer summit", source: "Reuters", date: "08 Jul 2026" },
    { title: "Nvidia expands automotive compute partnerships across Europe", source: "Bloomberg", date: "03 Jul 2026" },
    { title: "Analysts lift Nvidia targets on sustained AI infrastructure demand", source: "CNBC", date: "28 Jun 2026" },
    { title: "Nvidia to add 2,000 engineers at India R&D center", source: "The Economic Times", date: "21 Jun 2026" },
  ],
  nec: [
    { title: "NEC reports growth in semiconductor solutions division", source: "Nikkei Asia", date: "06 Jul 2026" },
    { title: "NEC Corporation of America wins federal IT modernization contract", source: "Washington Technology", date: "29 Jun 2026" },
  ],
  intel: [
    { title: "Intel foundry business courts new external customers", source: "Reuters", date: "04 Jul 2026" },
    { title: "Intel Ireland site plans leadership restructuring", source: "The Irish Times", date: "20 Jun 2026" },
  ],
  philips: [
    { title: "Philips advances digital health platform rollout", source: "MedTech Dive", date: "05 Jul 2026" },
    { title: "Philips names new innovation leadership in Amsterdam", source: "Het Financieele Dagblad", date: "27 Jun 2026" },
  ],
  tsmc: [
    { title: "TSMC Arizona fab ramps advanced-node production", source: "Reuters", date: "07 Jul 2026" },
    { title: "TSMC reaffirms capacity expansion plans in Taiwan", source: "Focus Taiwan", date: "30 Jun 2026" },
  ],
};
COMPANIES.forEach((c) => { c.news = NEWS[c.id] || []; });
/* BD trigger signals per family (backend replaces with EDGAR / ATS / GLEIF feeds) */
const SIGNALS = {
  nvidia: [
    { group: "leadership", kind: "Appointment", text: "Appointed new SVP of Automotive to lead the EMEA push", date: "04 Jul 2026", source: "SEC 8-K (Item 5.02)", entity: "US" },
    { group: "leadership", kind: "Departure", text: "Chief Revenue Officer to step down at year end", date: "12 Jun 2026", source: "SEC 8-K (Item 5.02)", entity: "US" },
    { group: "hiring", kind: "Senior opening", text: "VP, Data Center Sales — Santa Clara", date: "06 Jul 2026", source: "Greenhouse", entity: "US" },
    { group: "hiring", kind: "Senior opening", text: "Director, Automotive BD — Frankfurt", date: "28 Jun 2026", source: "Lever", entity: "Germany" },
    { group: "hiring", kind: "Hiring surge", text: "14 senior engineering roles opened at India R&D center", date: "21 Jun 2026", source: "Greenhouse", entity: "India" },
    { group: "capital", kind: "Acquisition", text: "Announced acquisition of an AI networking startup", date: "01 Jul 2026", source: "SEC 8-K (Item 2.01)", entity: "US" },
  ],
  nec: [
    { group: "leadership", kind: "Appointment", text: "New Head of Semiconductor BU named in Tokyo", date: "30 Jun 2026", source: "TDnet (JP disclosure)", entity: "Japan" },
    { group: "hiring", kind: "Senior opening", text: "VP Federal Sales — Irving, TX", date: "25 Jun 2026", source: "SmartRecruiters", entity: "US" },
    { group: "capital", kind: "Restructuring", text: "Announced reorganization of the electronics division", date: "18 Jun 2026", source: "TDnet (JP disclosure)", entity: "Japan" },
  ],
  intel: [
    { group: "leadership", kind: "Departure", text: "Foundry BD leader departed — senior seat now open", date: "15 Jun 2026", source: "SEC 8-K (Item 5.02)", entity: "US West" },
    { group: "hiring", kind: "Senior opening", text: "VP, Foundry Business Development — Santa Clara", date: "03 Jul 2026", source: "Greenhouse", entity: "US West" },
    { group: "capital", kind: "Restructuring", text: "Ireland site leadership restructuring underway", date: "20 Jun 2026", source: "Companies House (IE / CRO)", entity: "Ireland" },
  ],
  philips: [
    { group: "leadership", kind: "Appointment", text: "New innovation leadership named in Amsterdam", date: "27 Jun 2026", source: "AFM / company disclosure", entity: "NL" },
    { group: "hiring", kind: "Senior opening", text: "Head of Digital Health — Amsterdam", date: "02 Jul 2026", source: "Workday", entity: "NL" },
  ],
  tsmc: [
    { group: "leadership", kind: "Appointment", text: "New SVP Advanced Technology appointed", date: "27 Jun 2026", source: "TWSE disclosure", entity: "TW" },
    { group: "hiring", kind: "Hiring surge", text: "Ramp hiring for Arizona fab — 30+ operations roles", date: "07 Jul 2026", source: "Workday", entity: "AZ" },
    { group: "capital", kind: "Capex", text: "Reaffirmed multi-year capacity expansion plan", date: "30 Jun 2026", source: "TWSE / news", entity: "TW" },
  ],
};
COMPANIES.forEach((c) => { c.signals = SIGNALS[c.id] || []; });
function revSeries(c, scope, kind) {
  if (scope) return c.revenue[scope]?.[kind] || Array(12).fill(0);
  const out = Array(12).fill(0);
  Object.values(c.revenue).forEach((r) => r[kind].forEach((v, i) => { out[i] += v; }));
  return out;
}
const fmt = (v) => v >= 1e6 ? "$" + (v / 1e6).toFixed(1) + "M" : v >= 1e3 ? "$" + Math.round(v / 1e3) + "k" : "$" + v;
const fmtBig = (v) => v >= 1e6 ? "$" + (v / 1e6).toFixed(2) + "M" : v >= 1e3 ? "$" + Math.round(v / 1e3) + "k" : "$" + v;

/* logo/image helpers — always inherited from the HQ record (company.image) */
const companyMono = (name) => {
  const w = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
  return (w.length > 1 ? w.map((x) => x[0]).slice(0, 2).join("") : name.slice(0, 2)).toUpperCase();
};
const hqImage = (c) => (c.entities.find((e) => e.hq) || c.entities[0]).image || { url: null, color: "#6B7280" };

/* deep links to the Ezekia web app record (id-only, no PII). Real impl: use the Ezekia record id. */
const EZ_BASE = "https://ezekia.com/#";
const ezId = (s) => (Math.abs([...s].reduce((h, ch) => ((h << 5) - h + ch.charCodeAt(0)) | 0, 0)) % 900000) + 100000;
const ezUrl = (module, name) => `${EZ_BASE}/${module}/${ezId(module + name)}`;
/* News: backend fetches https://news.google.com/rss/search?q={family name} and parses each
   <item> into { title, source, pubDate, link }. Client links out to Google News (no article text stored). */
const googleNewsUrl = (q) => `https://news.google.com/search?q=${encodeURIComponent(q)}`;
/* BD signals: leadership (SEC 8-K Item 5.02 / Companies House / local disclosure),
   hiring (public ATS boards), capital (SEC 8-K/S-1 / local filings). Links out to source. */
const edgarUrl = (name) => `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&type=8-K&company=${encodeURIComponent(name)}`;
const signalUrl = (c, s) => s.group === "hiring" ? `https://www.google.com/search?q=${encodeURIComponent(c.name + " careers")}` : edgarUrl(c.name);
const parseSig = (s) => { const [d, m, y] = s.split(" "); return new Date(+y, MONTHS.indexOf(m), +d); };
const SIG_TODAY = new Date(2026, 6, 10);
const isNewSignal = (dateStr) => (SIG_TODAY - parseSig(dateStr)) <= 14 * 864e5;
/* recency-weighted scoring: leadership & capital weighted highest, 30-day half-life decay */
const TYPE_WEIGHT = { leadership: 3, capital: 3, hiring: 2 };
const daysAgoSig = (d) => (SIG_TODAY - parseSig(d)) / 864e5;
const signalWeight = (s) => (TYPE_WEIGHT[s.group] || 1) * Math.pow(0.5, daysAgoSig(s.date) / 30);
const SIGNAL_GROUPS = [
  { id: "leadership", label: "Leadership changes", desc: "Executive & board moves · SEC 8-K (Item 5.02), Companies House, local disclosure" },
  { id: "hiring", label: "Hiring activity", desc: "Senior openings across public job boards · Greenhouse, Lever, Ashby, Workday" },
  { id: "capital", label: "Capital events", desc: "M&A, funding, capex & restructuring · SEC 8-K / S-1, local filings" },
];

/* consultant avatar helpers + aggregated index (users appear across companies) */
const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const CONS_PALETTE = ["#4C6EF5", "#2FA88F", "#C2603F", "#7C5CD3", "#3B82C4", "#B7791F"];
const consColor = (name) => CONS_PALETTE[Math.abs([...name].reduce((h, ch) => ((h << 5) - h + ch.charCodeAt(0)) | 0, 0)) % CONS_PALETTE.length];
function buildConsultants() {
  const map = {};
  COMPANIES.forEach((c) => c.consultants.forEach((con) => {
    if (!map[con.name]) map[con.name] = { name: con.name, office: con.office, companies: [] };
    if (!map[con.name].companies.find((x) => x.id === c.id)) {
      map[con.name].companies.push({
        id: c.id, name: c.name, image: hqImage(c), mono: companyMono(c.name), industry: c.industry, hq: hqEntity(c).loc + ", " + hqEntity(c).country,
        entities: c.entities.length, entityName: (c.entities.find((e) => e.key === con.entity) || {}).name || con.entity,
        last: con.last, live: c.projects.filter((p) => p.dataType === "assignment" && p.status !== "Closed").length,
      });
    }
  }));
  return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
}
const hqEntity = (c) => c.entities.find((e) => e.hq) || c.entities[0];
const CONSULTANTS = buildConsultants();

/* ------------------------------ icons ------------------------------ */
const I = {
  search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
  sun: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>,
  moon: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>,
  menu: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>,
  companies: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="8" height="16" rx="1" /><rect x="13" y="9" width="8" height="11" rx="1" /><path d="M6 8h2M6 12h2M16 13h2" /></svg>,
  consultants: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5.4M21 20a6 6 0 0 0-4-5.6" /></svg>,
  stale: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  practice: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  signals: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h3l2.5 7 5-14 2.5 7H21" /></svg>,
  marketing: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h3l4 4V6L7 10H4a1 1 0 0 0-1 1z" /><path d="M16 8.5a4 4 0 0 1 0 7" /></svg>,
};

/* --------------------------- helpers/UI ---------------------------- */
function Logo({ image, mono, size }) {
  const cls = `logo-tile logo-${size}`;
  const color = (image && image.color) || "#6B7280";
  if (image && image.url) return <img className={cls} src={image.url} alt="" style={{ objectFit: "cover", background: color }} />;
  return <span className={cls} style={{ background: color }}>{mono}</span>;
}
function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (<>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>);
}
function statusPill(s) {
  const map = { "Active": "active", "In progress": "progress", "Closed": "closed" };
  return <span className={`pill ${map[s] || "closed"}`}>{s}</span>;
}
function oppPill(s) {
  const map = { "Won": "active", "Lost": "lost", "Negotiation": "progress", "Proposal sent": "progress", "Prospecting": "closed" };
  return <span className={`pill ${map[s] || "closed"}`}>{s}</span>;
}
function Table({ head, rows, empty }) {
  if (!rows.length) return <div className="tbl-wrap"><div className="empty">{empty}</div></div>;
  const labeled = rows.map((tr) => {
    const tds = Children.toArray(tr.props.children).map((td, i) => cloneElement(td, { "data-label": head[i] }));
    return cloneElement(tr, {}, tds);
  });
  return (
    <div className="tbl-wrap"><table>
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{labeled}</tbody>
    </table></div>
  );
}
function RecordLink({ href, children }) {
  return (
    <a className="rec-link" href={href} target="_blank" rel="noopener noreferrer" title="Open source record in Ezekia">
      {children}
      <svg className="ext" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 5h5v5M19 5l-8 8M11 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" /></svg>
    </a>
  );
}
function Check({ on }) {
  return <span className={`ms-check ${on ? "on" : ""}`}>{on && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}</span>;
}

/* ------------------------------ app -------------------------------- */
const NAV = [
  { id: "companies", label: "Companies", icon: I.companies },
  { id: "consultants", label: "Consultants", icon: I.consultants },
  { id: "practice", label: "Practice groups", icon: I.practice },
  { id: "signals", label: "Signals", icon: I.signals },
  { id: "stale", label: "Stale accounts", icon: I.stale, v2: true },
  { id: "marketing", label: "Marketing", icon: I.marketing, v2: true },
];

export default function App() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("companies");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [practiceCats, setPracticeCats] = useState([]);
  const [practiceSubs, setPracticeSubs] = useState([]);
  const [sideOpen, setSideOpen] = useState(false);
  const styleRef = useRef(null);

  useEffect(() => {
    if (!styleRef.current) {
      const el = document.createElement("style");
      el.textContent = STYLES;
      document.head.appendChild(el);
      styleRef.current = el;
    }
  }, []);
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  const selected = COMPANIES.find((c) => c.id === selectedId) || null;
  function openCompany(id) { setSelectedId(id); setPage("companies"); setSideOpen(false); }
  const pageTitle = NAV.find((n) => n.id === page)?.label || "";

  return (
    <div className="gbd">
      <div className="shell">
        <div className={`backdrop ${sideOpen ? "show" : ""}`} onClick={() => setSideOpen(false)} />
        <aside className={`sidebar ${sideOpen ? "open" : ""}`}>
          <div className="side-brand">
            <span className="brand-logo" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
            <span className="sub">Global BD Visibility</span>
          </div>
          <div className="nav-group-label">Workspace</div>
          {NAV.map((n) => (
            <button key={n.id} className={`nav-item ${page === n.id ? "on" : ""}`} onClick={() => { setPage(n.id); setSideOpen(false); }}>
              <n.icon /><span className="grow">{n.label}</span>{n.v2 && <span className="v2-tag">v2</span>}
            </button>
          ))}
          <div className="side-foot">
            <div className="access">
              <span className="avatar">JB</span>
              <div><div>Jan-Bart Smits</div><div className="role">Semiconductor practice</div></div>
            </div>
          </div>
        </aside>

        <div className="main">
          <header className="topbar">
            <button className="menu-btn" onClick={() => setSideOpen(true)} aria-label="Open menu"><I.menu /></button>
            <span className="topbar-title">{pageTitle}</span>
            <div className="topbar-right">
              <span className="readonly"><span className="dot" />Read-only · Source: Ezekia</span>
              <button className="theme-btn" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))} aria-label="Toggle color theme">
                {theme === "light" ? <I.moon /> : <I.sun />}
              </button>
            </div>
          </header>

          <div className="page">
            {page === "companies" && <CompaniesPage selected={selected} openCompany={openCompany} clear={() => setSelectedId(null)} />}
            {page === "consultants" && <ConsultantsPage openCompany={openCompany} selected={selectedConsultant} setSelected={setSelectedConsultant} />}
            {page === "practice" && <PracticePage openCompany={openCompany} cats={practiceCats} setCats={setPracticeCats} subs={practiceSubs} setSubs={setPracticeSubs} />}
            {page === "signals" && <ComingSoon feature="Signals" page />}
            {page === "stale" && <StalePage openCompany={openCompany} />}
            {page === "marketing" && <MarketingStub />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- companies page ------------------------ */
function CompaniesPage({ selected, openCompany, clear }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COMPANIES.filter((c) =>
      c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) ||
      c.entities.some((e) => e.name.toLowerCase().includes(q) || e.loc.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);
  useEffect(() => { setActive(0); }, [query]);

  function choose(c) { openCompany(c.id); setQuery(""); setOpen(false); }
  function onKeyDown(e) {
    if (!open || !results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    else if (e.key === "Enter") { e.preventDefault(); choose(results[active]); }
    else if (e.key === "Escape") setOpen(false);
  }

  return (
    <>
      <div className="search-wrap">
        <div className={`search-box ${open && results.length ? "open" : ""}`}>
          <I.search />
          <input value={query} placeholder="Search a company, region, or entity…"
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)} onKeyDown={onKeyDown}
            role="combobox" aria-expanded={open && !!results.length} aria-autocomplete="list"
            aria-controls="gbd-results" aria-activedescendant={open ? `opt-${active}` : undefined} />
        </div>
        {open && query && (
          <div className="results" id="gbd-results" role="listbox">
            {results.length ? results.map((c, i) => (
              <button key={c.id} id={`opt-${i}`} role="option" aria-selected={i === active}
                className={`result ${i === active ? "active" : ""}`} onMouseEnter={() => setActive(i)} onClick={() => choose(c)}>
                <Logo image={hqImage(c)} mono={companyMono(c.name)} size="sm" />
                <div className="result-main">
                  <div className="result-name">{highlight(c.name, query)}</div>
                  <div className="result-meta">{c.industry} · HQ {hqEntity(c).loc}</div>
                  <div className="result-regions">
                    {c.entities.slice(0, 4).map((e, k) => <span key={k} className="mini-chip">{e.loc}</span>)}
                    {c.entities.length > 4 && <span className="mini-chip">+{c.entities.length - 4}</span>}
                  </div>
                </div>
                <span className="count-pill">{c.entities.length} records</span>
              </button>
            )) : <div className="no-results">No company family matches <b>“{query}”</b>. Try a company name, region, or entity.</div>}
          </div>
        )}
      </div>

      {selected ? (
        <>
          <div className="selected-note">Resolved family view. <button onClick={clear}>Clear</button></div>
          <CompanyView company={selected} />
        </>
      ) : (
        <div className="empty-state">
          <div className="es-title">Look up a company to begin</div>
          <div className="es-sub">Type any company above, or jump straight to a semiconductor flagship account.</div>
          <div className="flagship-label">Flagship accounts</div>
          <div className="flagship">
            {FLAGSHIP.map((id) => {
              const c = COMPANIES.find((x) => x.id === id);
              return <button key={id} className="flag-chip" onClick={() => openCompany(id)}><Logo image={hqImage(c)} mono={companyMono(c.name)} size="xs" />{c.name}<span className="fc-n">{c.entities.length} records</span></button>;
            })}
          </div>
        </div>
      )}
    </>
  );
}

/* --------------------------- company view -------------------------- */
function CompanyView({ company: c }) {
  const [tab, setTab] = useState("overview");
  const [scope, setScope] = useState(null);
  useEffect(() => { setTab("overview"); setScope(null); }, [c.id]);

  const inScope = (row) => scope === null || row.entity === scope;
  const allAssign = c.projects.filter((p) => p.dataType === "assignment");
  const allOpps = c.projects.filter((p) => p.dataType === "opportunity");
  const scopedProjects = c.projects.filter(inScope);
  const f = {
    contacts: c.contacts.filter(inScope),
    consultants: c.consultants.filter(inScope),
    assignments: scopedProjects.filter((p) => p.dataType === "assignment"),
    opportunities: scopedProjects.filter((p) => p.dataType === "opportunity"),
    activity: c.activity.filter(inScope),
    placements: c.placements.filter(inScope),
    offLimitsList: c.offLimitsList.filter(inScope),
    marketing: c.marketing.filter(inScope),
    signals: c.signals.filter(inScope),
  };
  const scopeEntity = scope ? c.entities.find((e) => e.key === scope) : null;
  const entName = (key) => c.entities.find((e) => e.key === key)?.name || key;
  const hqLoc = hqEntity(c).loc + ", " + hqEntity(c).country;

  const TABS = [
    ["overview", "Overview", null],
    ["contacts", "Contacts", f.contacts.length],
    ["consultants", "Consultants", f.consultants.length],
    ["assignments", "Assignments", f.assignments.length],
    ["opportunities", "Opportunities", f.opportunities.length],
    ["revenues", "Revenues", null],
    ["activity", "Activity", f.activity.length],
    ["news", "News", c.news.length, true],
    ["signals", "Signals", f.signals.length, true],
    ["placements", "Placements", f.placements.length],
    ["offlimits", "Off-limits", f.offLimitsList.length],
    ["marketing", "Marketing", f.marketing.length],
  ];

  return (
    <div>
      <div className="co-head">
        <div className="co-ident">
          <Logo image={hqImage(c)} mono={companyMono(c.name)} size="lg" />
          <div className="co-title">
            <h2 className="gbd-display">{c.name}</h2>
            <div className="co-sub">
              <span>{c.industry}</span><span className="sep">·</span>
              <span>HQ {hqLoc}</span><span className="sep">·</span><span>{c.website}</span>
              {c.offLimits > 0 && <span className="badge limit"><span className="dot" />{c.offLimits} off-limits flag</span>}
            </div>
          </div>
        </div>
        <div className="co-stats">
          <div className="stat"><div className="n gbd-display">{c.entities.length}</div><div className="l">Entities</div></div>
          <div className="stat"><div className="n gbd-display">{c.contacts.length}</div><div className="l">Contacts</div></div>
          <div className="stat"><div className="n gbd-display">{allAssign.length}</div><div className="l">Assignments</div></div>
          <div className="stat"><div className="n gbd-display">{allOpps.length}</div><div className="l">Opportunities</div></div>
        </div>
      </div>

      <div className="family">
        <div className="family-label">Company family · pick a scope</div>
        <div className="family-chips">
          <button className={`fchip global ${scope === null ? "sel" : ""}`} onClick={() => setScope(null)}>
            <div>
              <div className="flabel"><span className="dotmark" />Global family</div>
              <div className="floc">All {c.entities.length} Ezekia records</div>
            </div>
          </button>
          {c.entities.map((e, i) => (
            <button key={e.key} className={`fchip ${scope === e.key ? "sel" : ""} ${e.hq ? "hq" : ""}`}
              style={{ animationDelay: `${(i + 1) * 70}ms` }} onClick={() => setScope(e.key)}>
              <div><div className="flabel">{e.name}</div><div className="floc">{e.loc} · {regionOf(e.country)}</div></div>
              {e.hq && <span className="hqtag">HQ</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="scope-line">
        {scope === null
          ? <span>Showing aggregated data across the <strong>global family</strong>.</span>
          : <><span>Showing data for <strong>{scopeEntity.name}</strong> — {scopeEntity.loc} only.</span><button className="clear" onClick={() => setScope(null)}>Back to global family</button></>}
      </div>

      <nav className="tabs" role="tablist">
        {TABS.map(([id, label, count, v2]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={`tab ${tab === id ? "on" : ""}`} onClick={() => setTab(id)}>
            {label}{count > 0 ? <span className="tcount">{count}</span> : null}{v2 ? <span className="v2-tag">v2</span> : null}
          </button>
        ))}
      </nav>

      <div className="panel" role="tabpanel">
        {tab === "overview" && <Overview c={c} f={f} scope={scope} scopeEntity={scopeEntity} goTab={setTab} />}
        {tab === "contacts" && <Table head={["Name", "Title", "Location", "Division", "Entity"]} empty={emptyMsg("contacts", scopeEntity)}
          rows={f.contacts.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("person", x.name)}>{x.name}</RecordLink></td><td>{x.title}</td><td className="cell-muted">{x.loc}</td><td className="cell-muted">{x.div}</td><td><span className="entity-tag">{x.entity}</span></td></tr>)} />}
        {tab === "consultants" && <Table head={["Consultant", "SC Office", "Assigned entity", "Last activity"]} empty={emptyMsg("consultants", scopeEntity)}
          rows={f.consultants.map((x, i) => <tr key={i}><td className="cell-strong">{x.name}</td><td className="cell-muted">{x.office}</td><td>{entName(x.entity)}</td><td className="cell-muted">{x.last}</td></tr>)} />}
        {tab === "assignments" && <Table head={["Assignment", "Function", "Status", "Location", "Date", "Entity"]} empty={emptyMsg("assignments", scopeEntity)}
          rows={f.assignments.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("project", x.title)}>{x.title}</RecordLink></td><td className="cell-muted">{x.fn}</td><td>{statusPill(x.status)}</td><td className="cell-muted">{x.loc}</td><td className="cell-muted">{x.date}</td><td><span className="entity-tag">{x.entity}</span></td></tr>)} />}
        {tab === "opportunities" && <Table head={["Opportunity", "Function", "Stage", "Est. fee", "Target date", "Entity"]} empty={emptyMsg("opportunities", scopeEntity)}
          rows={f.opportunities.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("project", x.title)}>{x.title}</RecordLink></td><td className="cell-muted">{x.fn}</td><td>{oppPill(x.status)}</td><td className="cell-num">{fmt(x.value)}</td><td className="cell-muted">{x.date}</td><td><span className="entity-tag">{x.entity}</span></td></tr>)} />}
        {tab === "revenues" && <RevenuesTab c={c} scope={scope} scopeEntity={scopeEntity} />}
        {tab === "news" && <ComingSoon feature="News" />}
        {tab === "signals" && <ComingSoon feature="Signals" />}
        {tab === "activity" && <Table head={["Date", "Type", "Note", "Consultant", "Entity"]} empty={emptyMsg("activity", scopeEntity)}
          rows={f.activity.map((x, i) => <tr key={i}><td className="cell-muted" style={{ whiteSpace: "nowrap" }}>{x.date}</td><td><span className="pill closed">{x.type}</span></td><td>{x.note}</td><td className="cell-muted">{x.who}</td><td><span className="entity-tag">{x.entity}</span></td></tr>)} />}
        {tab === "placements" && <Table head={["Candidate placed", "Role", "Entity", "Date"]} empty={emptyMsg("placements", scopeEntity)}
          rows={f.placements.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("person", x.candidate)}>{x.candidate}</RecordLink></td><td>{x.role}</td><td><span className="entity-tag">{x.entity}</span></td><td className="cell-muted">{x.date}</td></tr>)} />}
        {tab === "offlimits" && <Table head={["Entity", "Reason", "Off-limits until"]} empty={emptyMsg("offlimits", scopeEntity)}
          rows={f.offLimitsList.map((x, i) => <tr key={i}><td className="cell-strong">{entName(x.entity)}</td><td><span className="pill limit">{x.reason}</span></td><td className="cell-muted">{x.until}</td></tr>)} />}
        {tab === "marketing" && <>
          <p className="section-note">Contacts flagged for coordinated content distribution (e.g. white-paper sends){scope ? ` — ${scopeEntity.name} only` : " across the family"}. In Ezekia this is List membership, not a per-contact flag.</p>
          <Table head={["Name", "Title", "Entity", "Distribution list"]} empty={emptyMsg("marketing", scopeEntity)}
            rows={f.marketing.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("person", x.name)}>{x.name}</RecordLink></td><td>{x.title}</td><td><span className="entity-tag">{x.entity}</span></td><td><span className="pill progress">{x.list}</span></td></tr>)} />
        </>}
      </div>
    </div>
  );
}

/* --------------------------- revenues tab -------------------------- */
function RevenuesTab({ c, scope, scopeEntity }) {
  const [sub, setSub] = useState("collected");
  const series = revSeries(c, scope, sub);
  const total = series.reduce((a, b) => a + b, 0);
  const max = Math.max(...series, 1);
  const label = sub === "collected" ? "Collected revenue" : "Scheduled revenue";
  const totalCap = sub === "collected" ? "year to date · FY2026" : "full year · FY2026 (forecast)";
  const scopeCap = scope ? scopeEntity.name : "Global family";

  return (
    <div>
      <div className="rev-head">
        <div>
          <div className="rt-label">{label} · {totalCap}</div>
          <div className="rt-value gbd-display">{total > 0 ? fmtBig(total) : "$0"}</div>
          <div className="rt-cap">{scopeCap} · {scope ? "single Ezekia record" : `${c.entities.length} records aggregated`}</div>
          <div className="rt-cur"><span className="fx">USD</span>reporting currency · foreign-entity fees FX-normalized</div>
        </div>
        <div className="seg" role="tablist" aria-label="Revenue type">
          <button role="tab" aria-selected={sub === "collected"} className={sub === "collected" ? "on" : ""} onClick={() => setSub("collected")}>Collected</button>
          <button role="tab" aria-selected={sub === "scheduled"} className={sub === "scheduled" ? "on" : ""} onClick={() => setSub("scheduled")}>Scheduled</button>
        </div>
      </div>

      <div className="chart-card">
        <div className="bars">
          {series.map((v, m) => (
            <div className="bar-col" key={m}>
              <div className="bar-val">{v > 0 ? fmt(v) : ""}</div>
              <div className="bar-track">
                <div className={`bar-fill ${sub}`} style={{ height: `${(v / max) * 100}%` }} title={`${MONTHS[m]} 2026 · ${fmtBig(v)}`} />
              </div>
              <div className={`bar-month ${m === CUR_MONTH ? "cur" : ""}`}>{MONTHS[m]}</div>
            </div>
          ))}
        </div>
        <div className="rev-legend">
          <span><span className={`lg-dot ${sub}`} />{label} by month, 2026 (Ezekia revenue tag: {sub === "collected" ? "Collected" : "Scheduled"})</span>
          {sub === "collected" && <span style={{ color: "var(--text-faint)" }}>Future months populate as fees are received</span>}
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ feature, page }) {
  const card = (
    <div className="empty-state coming-soon">
      <div className="cs-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>
      </div>
      <div className="es-title">Coming soon</div>
      <div className="es-sub">{feature} is planned for Phase 2 and isn't available in this preview yet.</div>
    </div>
  );
  if (!page) return card;
  return (
    <>
      <div className="page-head"><h1>{feature}</h1></div>
      {card}
    </>
  );
}

function NewsSection({ c, scope }) {
  if (!c.news.length) return <div className="tbl-wrap"><div className="empty">No recent coverage found for {c.name}.</div></div>;
  return (
    <div>
      <p className="section-note">Latest coverage of {c.name}{scope ? " — tracked at the family (brand) level, not per entity" : ""}. Sourced from Google News, refreshed on each sync.</p>
      <div className="news-list">
        {c.news.map((n, i) => (
          <a key={i} className="news-item" href={googleNewsUrl(n.title)} target="_blank" rel="noopener noreferrer">
            <div className="news-title">{n.title}</div>
            <div className="news-meta">{n.source} · {n.date}</div>
          </a>
        ))}
      </div>
      <a className="news-all" href={googleNewsUrl(c.name)} target="_blank" rel="noopener noreferrer">View all coverage on Google News →</a>
    </div>
  );
}

function SignalsSection({ c, signals, scope }) {
  return (
    <div>
      <p className="section-note">Business-development trigger events for {c.name}{scope ? " (this entity)" : " across the family"}. Aggregated from open filings and public job boards; refreshed on sync.</p>
      {SIGNAL_GROUPS.map((g) => {
        const items = signals.filter((s) => s.group === g.id).sort((a, b) => parseSig(b.date) - parseSig(a.date));
        return (
          <div className="sig-group" key={g.id}>
            <div className="sig-head">
              <div className="sh-title"><span className={`sig-dot ${g.id}`} />{g.label}<span className="sh-count">{items.length}</span></div>
              <div className="sh-desc">{g.desc}</div>
            </div>
            {items.length ? (
              <div className="sig-list">
                {items.map((s, i) => (
                  <a key={i} className="sig-item" href={signalUrl(c, s)} target="_blank" rel="noopener noreferrer">
                    <span className={`sig-kind ${s.group}`}>{s.kind}</span>
                    <div className="sig-body">
                      <div className="sig-text">{s.text}{isNewSignal(s.date) && <span className="sig-new">NEW</span>}</div>
                      <div className="sig-meta">{s.date} · {s.source} · <span className="entity-tag">{s.entity}</span></div>
                    </div>
                  </a>
                ))}
              </div>
            ) : <div className="sig-empty">No recent {g.label.toLowerCase()}{scope ? " for this entity" : ""}.</div>}
          </div>
        );
      })}
    </div>
  );
}

function emptyMsg(kind, scopeEntity) {  const where = scopeEntity ? `for ${scopeEntity.name}` : "across this family";
  const labels = {
    contacts: "No contacts recorded", consultants: "No consultants assigned",
    assignments: "No assignments linked", opportunities: "No opportunities logged",
    activity: "No activity or notes tracked in Ezekia", placements: "No completed placements",
    offlimits: "No active off-limits flags", marketing: "No marketing contacts flagged",
  };
  return `${labels[kind]} ${where}.`;
}

function StatCard({ title, value, detail, valueStyle, to, goTab }) {
  const inner = (
    <>
      <div className="ct">{title}</div>
      <div className="cv" style={valueStyle}>{value}</div>
      <div className="cd">{detail}</div>
      {to && <svg className="card-go" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>}
    </>
  );
  if (to) return <button className="card clickable" onClick={() => goTab(to)} title={`Open ${title}`}>{inner}</button>;
  return <div className="card">{inner}</div>;
}

function Overview({ c, f, scope, scopeEntity, goTab }) {
  const active = f.assignments.filter((a) => a.status !== "Closed").length;
  const regions = scope ? [regionOf(scopeEntity.country)] : [...new Set(c.entities.map((e) => regionOf(e.country)))];
  const lastAct = f.activity[0]?.date || "—";
  const collectedYTD = revSeries(c, scope, "collected").reduce((a, b) => a + b, 0);
  const openOpps = f.opportunities.filter((o) => o.status !== "Won" && o.status !== "Lost").length;
  const pipeline = f.opportunities.filter((o) => o.status !== "Won" && o.status !== "Lost").reduce((a, o) => a + o.value, 0);
  const hqLoc = hqEntity(c).loc + ", " + hqEntity(c).country;
  return (
    <div className="cards">
      <StatCard title={scope ? "Entity" : "Global HQ"} value={scope ? scopeEntity.name : hqLoc} valueStyle={scope ? { fontSize: 18 } : undefined} detail={scope ? `${scopeEntity.loc} · ${regionOf(scopeEntity.country)}` : c.industry} />
      <StatCard title={scope ? "Region" : "Entities in family"} value={scope ? scopeEntity.loc : c.entities.length} detail={regions.join(" · ")} />
      <StatCard title="Collected revenue (YTD)" value={fmtBig(collectedYTD)} detail="USD · FY2026 to date" to="revenues" goTab={goTab} />
      <StatCard title="Open pipeline" value={fmtBig(pipeline)} detail={`${openOpps} live opportunit${openOpps === 1 ? "y" : "ies"}`} to="opportunities" goTab={goTab} />
      <StatCard title="Live assignments" value={active} detail={`of ${f.assignments.length} in view`} to="assignments" goTab={goTab} />
      <StatCard title="Contacts on file" value={f.contacts.length} detail={scope ? "at this entity" : "across all family entities"} to="contacts" goTab={goTab} />
      <StatCard title="Placements completed" value={f.placements.length} detail={scope ? "at this entity" : "globally, all time"} to="placements" goTab={goTab} />
      <StatCard title="Most recent activity" value={lastAct} valueStyle={{ fontSize: 18 }} detail={f.activity[0]?.type || "No activity"} />
      <StatCard title="Off-limits flags" value={f.offLimitsList.length} valueStyle={{ color: f.offLimitsList.length ? "var(--red)" : undefined }} detail={f.offLimitsList.length ? "restriction active" : "clear in view"} to="offlimits" goTab={goTab} />
      <StatCard title="Marketing contacts" value={f.marketing.length} detail="flagged for distribution" to="marketing" goTab={goTab} />
    </div>
  );
}

/* --------------------------- consultants page ---------------------- */
function ConsultantsPage({ openCompany, selected, setSelected }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CONSULTANTS.filter((c) => c.name.toLowerCase().includes(q) || c.office.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);
  useEffect(() => { setActive(0); }, [query]);

  const consultant = selected ? CONSULTANTS.find((c) => c.name === selected) : null;
  function choose(c) { setSelected(c.name); setQuery(""); setOpen(false); }
  function onKeyDown(e) {
    if (!open || !results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    else if (e.key === "Enter") { e.preventDefault(); choose(results[active]); }
    else if (e.key === "Escape") setOpen(false);
  }
  const top = [...CONSULTANTS].sort((a, b) => b.companies.length - a.companies.length).slice(0, 5);

  return (
    <>
      <div className="search-wrap">
        <div className={`search-box ${open && results.length ? "open" : ""}`}>
          <I.search />
          <input value={query} placeholder="Search a consultant by name or office…"
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)} onKeyDown={onKeyDown}
            role="combobox" aria-expanded={open && !!results.length} aria-autocomplete="list"
            aria-controls="cons-results" aria-activedescendant={open ? `copt-${active}` : undefined} />
        </div>
        {open && query && (
          <div className="results" id="cons-results" role="listbox">
            {results.length ? results.map((c, i) => (
              <button key={c.name} id={`copt-${i}`} role="option" aria-selected={i === active}
                className={`result ${i === active ? "active" : ""}`} onMouseEnter={() => setActive(i)} onClick={() => choose(c)}>
                <Logo image={{ color: consColor(c.name) }} mono={initials(c.name)} size="sm" />
                <div className="result-main">
                  <div className="result-name">{highlight(c.name, query)}</div>
                  <div className="result-meta">Stanton Chase · {c.office}</div>
                </div>
                <span className="count-pill">{c.companies.length} account{c.companies.length !== 1 ? "s" : ""}</span>
              </button>
            )) : <div className="no-results">No consultant matches <b>“{query}”</b>. Try a name or office.</div>}
          </div>
        )}
      </div>

      {consultant ? (
        <>
          <div className="selected-note">Global engagement view. <button onClick={() => setSelected(null)}>Clear</button></div>
          <ConsultantView consultant={consultant} openCompany={openCompany} />
        </>
      ) : (
        <div className="empty-state">
          <div className="es-title">Look up a consultant</div>
          <div className="es-sub">See every company a consultant is engaged with globally, across all family entities — no searching each fragmented record by hand.</div>
          <div className="flagship-label">Team</div>
          <div className="flagship">
            {top.map((c) => (
              <button key={c.name} className="flag-chip" onClick={() => setSelected(c.name)}>
                <Logo image={{ color: consColor(c.name) }} mono={initials(c.name)} size="xs" />
                {c.name}<span className="fc-n">{c.companies.length} account{c.companies.length !== 1 ? "s" : ""}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function ConsultantView({ consultant: con, openCompany }) {
  const totalLive = con.companies.reduce((a, c) => a + c.live, 0);
  const markets = [...new Set(con.companies.map((c) => c.hq))].length;
  return (
    <div>
      <div className="co-head">
        <div className="co-ident">
          <Logo image={{ color: consColor(con.name) }} mono={initials(con.name)} size="lg" />
          <div className="co-title">
            <h2 className="gbd-display">{con.name}</h2>
            <div className="co-sub"><span>Stanton Chase</span><span className="sep">·</span><span>{con.office} office</span></div>
          </div>
        </div>
        <div className="co-stats">
          <div className="stat"><div className="n gbd-display">{con.companies.length}</div><div className="l">Global accounts</div></div>
          <div className="stat"><div className="n gbd-display">{totalLive}</div><div className="l">Live assignments</div></div>
          <div className="stat"><div className="n gbd-display">{markets}</div><div className="l">HQ markets</div></div>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <Table head={["Company", "Industry", "HQ", "Entities", "Assigned entity", "Last activity", "Live assignments"]}
          empty="No company engagements on record."
          rows={con.companies.map((co, i) => (
            <tr key={i}>
              <td>
                <button className="company-link" onClick={() => openCompany(co.id)}>
                  <Logo image={co.image} mono={co.mono} size="xs" />
                  {co.name}
                  <svg className="go" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
              </td>
              <td className="cell-muted">{co.industry}</td>
              <td className="cell-muted">{co.hq}</td>
              <td className="cell-muted">{co.entities}</td>
              <td>{co.entityName}</td>
              <td className="cell-muted">{co.last}</td>
              <td className="cell-num">{co.live}</td>
            </tr>
          ))} />
      </div>
    </div>
  );
}

/* --------------------------- practice groups ---------------------- */
function PracticePage({ openCompany, cats, setCats, subs, setSubs }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const q = query.trim().toLowerCase();

  const groups = PRACTICES.map((g) => {
    const catMatch = g.category.toLowerCase().includes(q);
    const gs = q ? (catMatch ? g.subs : g.subs.filter((s) => s.toLowerCase().includes(q))) : g.subs;
    return { category: g.category, subs: gs, show: !q || catMatch || gs.length > 0 };
  }).filter((g) => g.show);

  const toggle = (arr, set, val) => set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  const hasFilter = cats.length > 0 || subs.length > 0;
  const count = cats.length + subs.length;
  const clearAll = () => { setCats([]); setSubs([]); };

  const companies = COMPANIES
    .filter((c) => cats.includes(c.practice.category) || subs.includes(c.practice.subcategory))
    .sort((a, b) => a.practice.category.localeCompare(b.practice.category) || a.name.localeCompare(b.name));

  return (
    <>
      <div className="ms-wrap" ref={wrapRef}>
        <button className={`ms-trigger ${open ? "open" : ""}`} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <I.search />
          <span className={`ms-label ${count ? "" : "ph"}`}>{count ? `${count} practice group${count !== 1 ? "s" : ""} selected` : "Select categories & subcategories"}</span>
          <svg className="ms-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        {open && (
          <div className="ms-panel">
            <div className="ms-search">
              <I.search />
              <input value={query} placeholder="Search categories or subcategories…" onChange={(e) => setQuery(e.target.value)} autoFocus aria-label="Search practice groups" />
            </div>
            <div className="ms-list">
              {groups.map((g) => (
                <div key={g.category}>
                  <button className="ms-opt cat" onClick={() => toggle(cats, setCats, g.category)}>
                    <Check on={cats.includes(g.category)} />{g.category}
                  </button>
                  {g.subs.map((s) => (
                    <button key={s} className="ms-opt sub" onClick={() => toggle(subs, setSubs, s)}>
                      <Check on={subs.includes(s)} />{s}
                    </button>
                  ))}
                </div>
              ))}
              {!groups.length && <div className="ms-empty">No practice groups match “{query}”.</div>}
            </div>
          </div>
        )}
      </div>

      {hasFilter ? (
        <>
          <div className="sel-summary">
            <span>Filtering by:</span>
            {cats.map((c) => <span className="sel-chip" key={"c" + c}>{c}<button onClick={() => toggle(cats, setCats, c)} aria-label={`Remove ${c}`}>✕</button></span>)}
            {subs.map((s) => <span className="sel-chip" key={"s" + s}>{s}<button onClick={() => toggle(subs, setSubs, s)} aria-label={`Remove ${s}`}>✕</button></span>)}
            <button className="sel-clear" onClick={clearAll}>Clear all</button>
          </div>
          <Table head={["Company", "Category / Subcategory", "Global HQ", "Entities", "Collected revenue", "Assignments", "Placements"]}
            empty="No companies fall under the selected practice groups."
            rows={companies.map((c, i) => {
              const collected = revSeries(c, null, "collected").reduce((a, b) => a + b, 0);
              const assignN = c.projects.filter((p) => p.dataType === "assignment").length;
              return (
                <tr key={i}>
                  <td>
                    <button className="company-link" onClick={() => openCompany(c.id)}>
                      <Logo image={hqImage(c)} mono={companyMono(c.name)} size="xs" />{c.name}
                      <svg className="go" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </button>
                  </td>
                  <td><span className="cell-strong">{c.practice.subcategory}</span><div className="cat-sub">{c.practice.category}</div></td>
                  <td className="cell-muted">{hqEntity(c).loc}, {hqEntity(c).country}</td>
                  <td className="cell-muted">{c.entities.length}</td>
                  <td className="cell-num">{fmtBig(collected)}</td>
                  <td className="cell-num">{assignN}</td>
                  <td className="cell-num">{c.placements.length}</td>
                </tr>
              );
            })} />
        </>
      ) : (
        <div className="empty-state">
          <div className="es-title">Select practice groups to see companies</div>
          <div className="es-sub">Choose one or more categories or subcategories above — companies mapped to your selection appear here, with revenue, assignment and placement totals across each global family.</div>
        </div>
      )}
    </>
  );
}

/* --------------------------- signals (firm-wide) ------------------ */
function AggregateSignalsPage({ openCompany }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [days, setDays] = useState(0); // 0 = all time
  const [sort, setSort] = useState("newest"); // newest | hottest
  const q = query.trim().toLowerCase();

  const all = useMemo(() => COMPANIES.flatMap((c) => c.signals.map((s) => ({ ...s, company: c }))), []);
  const filtered = all.filter((s) =>
    (group === "all" || s.group === group) &&
    (days === 0 || daysAgoSig(s.date) <= days) &&
    (!q || s.company.name.toLowerCase().includes(q) || s.text.toLowerCase().includes(q) || s.source.toLowerCase().includes(q))
  );
  const newCount = all.filter((s) => isNewSignal(s.date)).length;
  const companiesCount = new Set(all.map((s) => s.company.id)).size;

  const GROUP_TABS = [["all", "All"], ["leadership", "Leadership"], ["hiring", "Hiring"], ["capital", "Capital"]];
  const DAY_TABS = [[0, "All"], [7, "7d"], [30, "30d"], [90, "90d"]];
  const SORT_TABS = [["newest", "Newest"], ["hottest", "Hottest"]];

  const chrono = [...filtered].sort((a, b) => parseSig(b.date) - parseSig(a.date));
  const ranked = (() => {
    const m = {};
    filtered.forEach((s) => { (m[s.company.id] || (m[s.company.id] = { company: s.company, items: [], score: 0 })).items.push(s); });
    const arr = Object.values(m);
    arr.forEach((b) => { b.score = Math.round(b.items.reduce((a, s) => a + signalWeight(s), 0) * 10); b.items.sort((x, y) => parseSig(y.date) - parseSig(x.date)); });
    return arr.sort((a, b) => b.score - a.score);
  })();

  const Row = (s, key, showCompany) => (
    <div className="agg-item" key={key}>
      <span className={`sig-kind ${s.group}`}>{s.kind}</span>
      <div className="sig-body">
        <div><a className="agg-text" href={signalUrl(s.company, s)} target="_blank" rel="noopener noreferrer">{s.text}</a>{isNewSignal(s.date) && <span className="sig-new">NEW</span>}</div>
        <div className="agg-meta">
          {showCompany && <><button className="company-link sm" onClick={() => openCompany(s.company.id)}><Logo image={hqImage(s.company)} mono={companyMono(s.company.name)} size="xs" />{s.company.name}<svg className="go" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button><span className="agg-dot">·</span></>}
          {s.date}<span className="agg-dot">·</span>{s.source}<span className="entity-tag">{s.entity}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="page-head">
        <h1>Signals</h1>
        <p>Business-development triggers across all {companiesCount} synced companies — leadership moves, senior hiring, and capital events. {newCount} new in the last two weeks.</p>
      </div>

      <div className="agg-controls">
        <div className="search-wrap">
          <div className="search-box"><I.search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter by company, event, or source…" aria-label="Filter signals" /></div>
        </div>
        <div className="ctrl"><span className="ctrl-label">Type</span><div className="seg">{GROUP_TABS.map(([id, l]) => <button key={id} className={group === id ? "on" : ""} onClick={() => setGroup(id)}>{l}</button>)}</div></div>
        <div className="ctrl"><span className="ctrl-label">Window</span><div className="seg">{DAY_TABS.map(([id, l]) => <button key={id} className={days === id ? "on" : ""} onClick={() => setDays(id)}>{l}</button>)}</div></div>
        <div className="ctrl"><span className="ctrl-label">Sort</span><div className="seg">{SORT_TABS.map(([id, l]) => <button key={id} className={sort === id ? "on" : ""} onClick={() => setSort(id)}>{l}</button>)}</div></div>
      </div>

      {!filtered.length ? (
        <div className="empty-state"><div className="es-title">No signals match</div><div className="es-sub">Try a different company, keyword, type, or time window.</div></div>
      ) : sort === "newest" ? (
        <div className="agg-list">{chrono.map((s, i) => Row(s, i, true))}</div>
      ) : (
        <>
          <p className="section-note">Accounts ranked by a recency-weighted signal score — recent leadership and capital events count most.</p>
          {ranked.map((b, bi) => (
            <div className="acct-block" key={b.company.id}>
              <div className="acct-head">
                <span className="acct-rank">{bi + 1}</span>
                <button className="company-link" onClick={() => openCompany(b.company.id)}><Logo image={hqImage(b.company)} mono={companyMono(b.company.name)} size="xs" />{b.company.name}<svg className="go" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                <span className="score-badge" title="Recency-weighted signal score">Signal score {b.score}</span>
              </div>
              <div className="acct-list">{b.items.map((s, i) => Row(s, b.company.id + "-" + i, false))}</div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

/* --------------------------- stale accounts (v2) ------------------- */
function StalePage({ openCompany }) {
  const stale = COMPANIES.filter((c) => c.staleMonths >= 6).sort((a, b) => b.staleMonths - a.staleMonths);
  return (
    <>
      <div className="page-head">
        <h1>Stale accounts</h1>
        <p>Company families with no tracked activity in 6+ months. A v2 direction surfaced in the Franz call — shown here as a working preview of the intelligence layer.</p>
      </div>
      <Table head={["Company", "Last activity", "Idle", "Entities"]} empty="No stale accounts — every family has recent activity."
        rows={stale.map((c, i) => (
          <tr key={i}>
            <td><button className="company-link" onClick={() => openCompany(c.id)}><Logo image={hqImage(c)} mono={companyMono(c.name)} size="xs" />{c.name}<svg className="go" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button></td>
            <td className="cell-muted">{c.activity[0]?.date || "—"}</td>
            <td><span className="pill stale">{c.staleMonths} months idle</span></td>
            <td className="cell-muted">{c.entities.length}</td>
          </tr>
        ))} />
    </>
  );
}

/* --------------------------- marketing (v2) ------------------------ */
function MarketingStub() {
  return (
    <>
      <div className="page-head"><h1>Marketing</h1></div>
      <div className="stub">
        <span className="badge-v2">Planned · v2</span>
        <h3>Coordinated content distribution</h3>
        <p>Build a single send list across a company family — push white papers and content to every relevant contact globally at once, without relying on individual consultants to forward it.</p>
        <ul>
          <li>Assemble recipients from Ezekia Lists (marketing-flagged) across all family entities</li>
          <li>Filter by practice, region, or distribution list</li>
          <li>Hand off to Ezekia for the actual send — nothing writes back from this layer</li>
        </ul>
      </div>
    </>
  );
}
