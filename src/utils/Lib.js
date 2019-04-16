export default {
    ShowToast:(title,ico) => {
        wx.showToast({
            title: title,
            icon: ico,
            duration: 1500
          })
    }
}