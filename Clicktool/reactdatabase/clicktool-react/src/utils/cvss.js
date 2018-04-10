export const colorMap = (score, ver) => {
  const colors = {
    '1': 'green',
    '2': 'yellow',
    '3': 'yellow',
    '4': 'yellow',
    '5': 'red',
    '6': 'red'
  }
  if (colors[`${score}`]) {
    return colors[`${score}`]
  }

  if (ver === 2) {
    return score > 7 ? 'red' : 'green'
  } else {
    return score > 8 ? 'red' : 'green'
  }
}

export default { colorMap }
