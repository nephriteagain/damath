import { data } from "../types/types"

export function chipStyling(item : data, chipStyle : {[key: string]: string}) {
  if (item?.piece === 'z') chipStyle.background = 'linear-gradient(to top left, red 0%, rgb(255, 90, 90) 70%)'
  if (item?.piece === 'x') chipStyle.background = 'linear-gradient(to top left, blue 0%, rgb(90, 90, 255) 70%)'
  if (item?.king) chipStyle.border = '0.2rem dashed white'
  if (item?.movable) chipStyle.opacity = '1'
  if (!item?.movable) chipStyle.opacity = '0.4'
  }

export function underLining(item: data, underline: {[key: string]: string}) {
  if (item?.value === 6 || item?.value === -9) {
    underline.borderTop = '0.1rem solid white'
  }
}