export class Api {
  setImage (file: Blob) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      let img: HTMLImageElement = this.selectEl
      img.onload = () => {
        let isVertical: boolean = img.height > img.width
        if (isVertical) {
          img.height = 400
        } else {
          img.width = 400
        }
      }
      img.src = this.result
    }
  }
}