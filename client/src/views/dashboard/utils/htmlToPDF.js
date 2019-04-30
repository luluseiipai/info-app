// // 导出页面为PDF格式
// import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'
// export default{
//   install (Vue, options) {
//     Vue.prototype.getPdf = function () {
//       var pdfTitle = this.pdfTitle  //pdf的名称
//       var pdfDom = document.querySelector('#pdfDom')
//       html2Canvas(pdfDom, {
//         // allowTaint: true,
//         useCORS:true
//       }).then(function (canvas) {
//         console.log(canvas)
//         const marginBottom = 34    // 项目页面显示微处理 以下用到的地方 可以忽略
//         let canvasWidth = canvas.width 	//页面生成canvas宽度
//         let canvasHeight = canvas.height + marginBottom //页面生成canvas高度
//         let pageHeight = canvasWidth / 592.28 * 841.89 + marginBottom   //分页 每页的高度
//         let allPageHeight = canvasHeight  // 所有页面的高度
//         let position = 0 //偏移量
//         let imgWidth = 595.28 //生成canvas 图片的宽度
//         let imgHeight = 592.28 / canvasWidth * canvasHeight //生成canvas 图片的高度
//         let pageData = canvas.toDataURL('image/jpeg', 3.0)
//         // console.log(canvasWidth)
//         // console.log(canvasHeight)
//         // console.log(pageHeight)
//         // console.log(allPageHeight)
//         // console.log(position)
//         // console.log(imgWidth)
//         // console.log(imgHeight)
//         // console.log(pageData)
//         let PDF = new JsPDF('', 'pt', 'a4')
//         if (allPageHeight < pageHeight) {
//           PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//         } else {
//           // 循环生成分页
//           while (allPageHeight > 0) {
//             PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//             allPageHeight = allPageHeight - pageHeight - marginBottom
//             position = position - 841.89 - marginBottom
//             if (allPageHeight > 0) {
//               PDF.addPage() //添加新的一页
//             }
//           }
//         }
//         PDF.save(pdfTitle + '.pdf')  //保存pdf
//       })
//     }
//   }
// }

import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
  install (Vue, options) {
    Vue.prototype.getPdf = function () {
      var title = this.htmlTitle
      html2Canvas(document.querySelector('#pdfDom'), {
        useCORS:true
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        PDF.internal.scaleFactor = 1.33;
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      }
      )
    }
  }
}