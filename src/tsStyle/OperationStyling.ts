import { data } from "../data/counting"

export function operationStyling (item: data, operationStyle: {[key: string]: string}) {
  if (item?.piece === null) {
    operationStyle.top = '50%'
    operationStyle.left = '50%'
    operationStyle.transform = 'translate(-50%, -50%) scale(2.5)'
  } else {
    operationStyle.top = '0'
    operationStyle.left = '0'
  }

}