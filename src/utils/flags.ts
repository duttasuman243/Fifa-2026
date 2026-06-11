const MAPPED_FLAGS: Record<string, string> = {
  'USA': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXZJoHbKNX-O8Cv_owNumvw6YYCIaVznBmo9NwNHHINm1W8h01kr_32pH-3-qnIdTOBLITR7Bciq61LHDTmHgUn5Ws2Y2INMStjaWFekWZMwHWK-qt1vtQUebZIqqZCT-5rquFfuc-fT78XW0OBJ4sgkn8_TIr3A9FotyNPFxAkx5xNgFQw__zLk_m_tG-ZwC_d7FYR1iw4Qs7QWDX62FhG9hDR3Vfgs9Ls8TbVuwzveSYTsfL1-wozn2rzgkkhFXtY8jMselCoDQ',
  'Mexico': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDicUm6HwxMmQW61tJEqn5SDg7bOUwVVlKPq9HB-VTcJVgx59gn2L2GcDzwS9QGydPFwFga5vRRVdJXDo1tvIQFg9owLUdu5uTrFC24kD4WQ7CPng1thu-qAKtLaRS_xITlHuSKz9Ka2xSproAkVbBadGahXwGnLdlXtc_u-XrU9aVAfiAbDbE-4dwgAsB1LvRb-HhXuZ4YmVlS9aN0OBnJILuqqZ3PCdNXQ_bOn_JiYD0KUjMnTVR_IPHq2TCOTAUQuovmh-Xi-8o',
  'Canada': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBls-0oEzqd_efFpknHbJwjicK87eFw4_5o0I5BPXV-v07oMqoyBkUns9bA8rxVJ7rc5pSVE30HpQ1rBVDwq6xMSl61AioVVq9Wmr_3aztASbPsZv-te4lhYBiFwwCQ50L0QUajyugcUVsv0s2F4cbYrftVq8Hee4RZCnGhLmpRjxNzbmhR7lSyxXcP166eBUZv2y41X-1YC7frtmGZ1RiE0sl7lLYelXywRaj5ZfuYekHvCNcBmrTgeMmGwAQ4coqUGrkQ6IkSXLc',
  'Australia': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYyCXBeflfasH52P6gW9pLf-FC9D6N-mLv4yBYYHgjROVrqx8oLMxWLNKmLaJSDWK8pE-h13WjzCUHoID3R9Tj833MJFCtl4LUcKnQlfPRnciIGlDR9mSMm_42lfpYyHxoq2L_j4TtyxF0xH2Udfud1kas8DqKNfgnqnT3MaR5W2cBvETA68hbB7p4E2vYq9qXlzq5VXOViPQMW7bj-d42pCvTGSLIPcyELMk5ex0odXbRnp1-GQz8b_7yDwXUkMIyI5lbfMs2OyA',
  'South Korea': 'https://lh3.googleusercontent.com/aida-public/AB6AXuArIcjKynPKso_5DP04TPueVKYCd8dRBPzNWPZEfkpss-x7xCDzfCDMpPYl_GHrvwYZogopUbd4dnH3NLxX9-V8r8dHM5bXDGZ6byU0jQQ6IV48q7JhEvJXR16uTwc5pUzlIDW_Sp9w3EjYE4bvfp0VcezdypOWB5JUs37HsO6MgPjJTdt3l_hMU3lOevUBpHttdYZUSqOxoOj_CVBdoG8YQBbEfc2Ih9S-yXisSw9CjSz9wOadpwbKJDNqp2qOrCqokUX6ulV_tig',
  'Ghana': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8qe7VEzm6Lo8CB--cOk3cQmjxz4X4hX204VWI5FtDqwzETR9h9NRXHTvP6uCTo8C_o2N16j9PJc-zkrWryiiO2JzxUdPNAxB6GEOcDTdYckKmfNm26qS_10wuZqxHN7BjQa085_DJkLAcD0PDw-y_LuSf0ppuGsBPu0hSTn-PHRgITC6MxJlsDyFCOnZrkWf9rLQD-p6LzgjtQyboga_xKfe0wvWEKktfNNh1IDDUnPuvVn3b1BlBZUJMIX3Wpub5nrSY8CHHG7k',
  'Brazil': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr1fEqHU1SeeaxawK0gezcxrfbHTEAZpBlaj3Stb-ImrB56yjfEyRmJuECQtG57d17LWMJ6KFFQijd221_OVnExnxvP6qC-MlCWGWGQKkpnesSkcKiLEinhCvLdH6jVwoTIrImnO_bWweW_4A6qiunppF8R-MP9P5YFIIAj2FqhWX6OB5lyCFX6r-8cPO6w1HvmtCD0LuS2MFSCrWGizWKRDf7p-jLpvaghrt-El7shYZTVZ8VgN6Aqp39OCqlYOqDqiO6I5F7WYo',
  'Denmark': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5r3Fw81EADelY_R_uPeaOq0kjpBJm4nl1uLDZphju4pxm9ov6dby6wWxK7PXLeG9uD61iQbpodDFVFXji8AitI8_evKxEnH9RQ7NIozamdZIbxOVCkZyiDg3DWAKQEWWKoiJYMk9BAqAP-_HaU0Vs9fssN5XrLz5TFfdrneex7Gr5z7ze2AAPNZrml7LkhkMyKLjawKCqGymC5LN_kX_PTo746kvrEWDsS4UVVvSpEE25qX36AXCSJmWEX10YrJ1lkfBOftYHH0',
  'France': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhwg9WotFBGzpmsb0mVKRhRPYewm_jtJfxU8Wo4i5A4ooa5BwOFPaHBdvhzKLEeYTj-t-LJZwxROlOyTk1uRvw5vXkY0DghFlp1Hw3Kqv3H0qi0rOpiHEesL3LBfppA_FPJCgGIBJo7pmMvYDwaNOv7LqSPTiz7dSZaTSkddE0aYYNLVbRiG55hxfEi_WqN8QhBLfB09zNGy9c8r9K09AJXnoh1cbe6I8D9e0MPVVxRvbFohCdTMViQqU34YCQCZ0GZCqINXBLyck',
  'Spain': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnGD7G82ifOHJIHbvn4-LQi1MCEYAFnW3fyn9ZaLRDQaYEx4k_VEYp_p3fm-gL_7U3TDIpTo5Y2ryaYT5UxZZaesNeBI40r0AKaKpqOADtQTxWO1rJvo0bcoXgMYKx-HfHjauT48WYlgMKMucZTb1xPrXvzAGxSSZ_d32LPuOJQksMBnusgaUydMWg4MI9IBwJ72SaXzYumE88ogQKy48t27-oEOf-ewHtJXZzMAiJVI2uRdkPdhnjN9zJzEt1kGWMMInNLHs3vmU',
  'Argentina': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaJfpJeoJ-Gk-orcu_c_XCeW9drFUGsvgGu-FBT_W_hf0d78Hu8kp5v9wOpSj9a9iq7urieVyFViaixD-Kqd8oZtCrb-91anbZi56ZYDpwfABWTafI7JYc7D87k18qyHT415dd-Kmr2FbVX3IuhVje-ZS_wyNrpRVogCmIlK5ng8IOujfmQFTuQjkkDFHHTTu009dEQd1wI7Tor0NLZNo4pBoMil9_km2XLgMQ8bLsgBa2yOKHfgv3ijJ73VAqHNcY-ncSdatnUSs',
  'Germany': 'https://placehold.co/128x128/192231/ffd44d?text=GER',
  'England': 'https://placehold.co/128x128/192231/e2e8f0?text=ENG',
  'Japan': 'https://placehold.co/128x128/192231/ff4d4d?text=JPN',
  'Morocco': 'https://placehold.co/128x128/192231/10b981?text=MAR',
  'Netherlands': 'https://placehold.co/128x128/192231/f97316?text=NED',
  'Cameroon': 'https://placehold.co/128x128/192231/10b981?text=CMR',
  'Portugal': 'https://placehold.co/128x128/192231/ef4444?text=POR',
  'Belgium': 'https://placehold.co/128x128/192231/ffd44d?text=BEL',
  'Saudi Arabia': 'https://placehold.co/128x128/192231/10b981?text=KSA',
  'Costa Rica': 'https://placehold.co/128x128/192231/ef4444?text=CRC',
  'Italy': 'https://placehold.co/128x128/192231/3b82f6?text=ITA',
  'Croatia': 'https://placehold.co/128x128/192231/ef4444?text=CRO',
  'Ecuador': 'https://placehold.co/128x128/192231/ffd44d?text=ECU',
  'Nigeria': 'https://placehold.co/128x128/192231/10b981?text=NGA',
  'Uruguay': 'https://placehold.co/128x128/192231/3b82f6?text=URU',
  'Senegal': 'https://placehold.co/128x128/192231/10b981?text=SEN',
  'Switzerland': 'https://placehold.co/128x128/192231/ef4444?text=SUI',
  'Colombia': 'https://placehold.co/128x128/192231/ffd44d?text=COL',
  'South Africa': 'https://placehold.co/128x128/192231/10b981?text=RSA',
  'Iraq': 'https://placehold.co/128x128/192231/e2e8f0?text=IRQ',
  'Poland': 'https://placehold.co/128x128/192231/ef4444?text=POL',
  'Peru': 'https://placehold.co/128x128/192231/ef4444?text=PER',
  'Tunisia': 'https://placehold.co/128x128/192231/ef4444?text=TUN',
  'China': 'https://placehold.co/128x128/192231/ef4444?text=CHN',
  'Sweden': 'https://placehold.co/128x128/192231/3b82f6?text=SWE',
  'Chile': 'https://placehold.co/128x128/192231/ef4444?text=CHI',
  'Algeria': 'https://placehold.co/128x128/192231/10b981?text=ALG',
  'Qatar': 'https://placehold.co/128x128/192231/881337?text=QAT',
  'Norway': 'https://placehold.co/128x128/192231/ef4444?text=NOR',
  'Egypt': 'https://placehold.co/128x128/192231/ef4444?text=EGY',
  'Oman': 'https://placehold.co/128x128/192231/ef4444?text=OMA',
  'Wales': 'https://placehold.co/128x128/192231/ef4444?text=WAL',
  'Serbia': 'https://placehold.co/128x128/192231/3b82f6?text=SRB',
  'Turkey': 'https://placehold.co/128x128/192231/ef4444?text=TUR',
  'Uzbekistan': 'https://placehold.co/128x128/192231/3b82f6?text=UZB',
  'India': 'https://placehold.co/128x128/192231/f97316?text=IND',
  'Iran': 'https://placehold.co/128x128/192231/10b981?text=IRN',
};

export function getFlag(teamName: string): string {
  const norm = teamName.trim();
  if (MAPPED_FLAGS[norm]) {
    return MAPPED_FLAGS[norm];
  }
  // Safe dynamic fallback matching standard look
  const initials = norm.substring(0, 3).toUpperCase();
  return `https://placehold.co/128x128/192231/ffe083?text=${initials}`;
}
