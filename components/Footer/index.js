import React from 'react'

function Footer() {
  return (
    <div className='footer'>
        <div className='name'>Developed by <a href="https://github.com/captainIN" target="_blank">@captainIN</a></div>
        <div className='social'>
            <a className='icon' href="https://linkedin.com/in/jaymanyoo" target="_blank">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO8AAADTCAMAAABeFrRdAAAAb1BMVEUAe7b///93r9EAd7QAcbEAc7Ld7PTG3ewAebWry+IAba/0+vxgoconiL3a6vMAeLVzqs87kcO91+iXv9rk8fcUgrqFt9e21Ofs9PnT5vEXgLmQu9hXm8f4/f42jL+jyOFJmMdopcwAaK3A3Outz+RRXw8EAAAF40lEQVR4nO2dWXujOgyGTWxTNyQBsm9AOJP//xsPSTPNMiAZzEyEq++iT28MfmPjRZJlEXwrLMpcDFJmdVrPs8BG4vc/m1RJ+e6Kd5UxUsejpT1vmOr43ZV2ldQHW97z2Ly7tj3I6HxrxbtQ765qT5J7DPjCW/iCWzXxPkJ5Z8qHznyTPKG808GPVI9Snwhvod9dxX4VgxOxCKYe9eaLdAHy7vwZrL5kcpD3MNhFVZM0tM4SE69Gq4v0HOJdefb5VlPSAuL1T3L9w3hHzMu8/oh5mdcnMS/z+iTmZV6f1BOvkUopef1DewvZC69U0/U8jLIsCueHXFE2ivTAK1UyeywVjggTO/MaNfnDTRElZO18rrxGbupKfhiin7Ejb7xvsPdtpzT7tBtv3OyBynKSwE68xgDW3GhPsUs78Y4/gMLBjOKg5cILlq10IOhsc+A1EnEfB/t/w9BGDrx4BMgnvR7twovGfwT0ZuHuvOaI4gYJuTmpO6+GYwOumpMbsbrzqhDn3XrEq21iEsmN0J15jQAKfiulNmB1553a8B5/GO/EG16xt+E9UQsA6d6+sQ0vufgth/nIIoI6IrfAcuCFIntuohev1p0X2w1etPBovWEzYOXUurMLL96h6XVnp/0+GHt5EbnVhps9R9Wanu/6oNe8Trwmhg06FKMvneyTEtzyl+Q2+8LV3q6B0geCvdnZn6Iai9PEdfaXqUn9tp+qh9DZHyr3NU6G3YrcwuqmHvzd6rh7LhZO6B7S6iOewai8+DbeLYsTYfd+T/EqRiuRTpKkTIWifXa2t3gkY2QlcvvdV3H8FfP6JOZlXp/EvMxLQbG8KXZb0gyAV+qx2qflaH1Yj0bJcWrUWHVeyBHnrRbmq+QcPu+xL1HWR9EtstzNfqVhtS7ysrGSarqYNdQt23WKLHeyx/7KIkg15nZdQEWyp/QXUk12QOUqzUZKt2xkJ14wfLLa99fwwkE9n3feWJUWDsjsELdrY6q8Km3qyC+Kklbpm2jyGgXmBXnWbtWiiUnyypVNNrK7JvbWQYq82iJS8Vlra+svQV6VtMVtkZSMHm+zywKSrTuDHK8uW7NeVdp9w9R4Tdoe9Ut2oU/UeNEzAm3eRp/3P4sgpyZZHQ8hxtt6JnqUTTwBLd5zu3XGizYWPZoWr6MshiyveM94A3vFGwi0gf3iXaM7Jb948SOafvHiI5ZnvGjCTM940Yhcz3gzzCjtGS96IMY33gXyAVPm3c4P5THN01OyQAzvd2Ex12R5s89U6as70MRSK7sLFKrfaDxM3iJ+jkk0cgxlfn2oMzxg0eSN0poITJ3b2D5SeMAiybsUtaOO3FscOUaO0FPk3YqGNsLuE7gIGaAp8jZn3rFwK21gKxZBXuAQHp7iBJuQ6PFuIRe2htKRN72UNi9iVsWKIykh6PEi78RWWlkMTsDkeOdIf8SS9mRw2i1yvMj8ifuXYBMHOV7kndiZRezMMTXeJWagUFgcC5zihBov8vkiF4JcBO/4qfGiBjf4Rp/B8U5QAyO2LYQPlVPjRRMMyRJ5AvyLUeNdIe/E06oNijdD45pjbAIeFG+EOrzQBcegePEEcGgeqkHxLpmXeT3ixR3WnvH+tPZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXuZlXub1iDckzXtehoCWv/6svFy0LvKqKfiEcHn8a+fphBqDqotV1+2LvMjATxj/vXwUQxTzMq9PYl7m9UnMy7w+iXmZ1ycx70/mpX5bc3uB6WiEzY0Vw5KEEv6JCem7x7sITCcl0OxMg5OG0gwLNB360ARnoxGWlygNR3C2MBEUuH10UIoh3Io3mHo1YinY3F/xzlrdVklcWD7lS7LWwp8hy6yQ3JXX5LTWVxlSl9xvYdwv3uBck0t9eDI6x3BvvEGY6sGPWlJjiXbvvEGwSZUc7FLLGKntrm94SC4dFmX+7op3k1md1nOLxP6V/gcpzY0vdqB0nAAAAABJRU5ErkJggg==" alt="linkedIn"/>
            </a>
            <a className='icon' href="https://github.com/captainIN" target="_blank">
                <img src="https://www.kindpng.com/picc/m/694-6943896_github-logo-png-github-icon-png-transparent-png.png" alt="github"/>
            </a>
        </div>
    </div>
  )
}

export default Footer