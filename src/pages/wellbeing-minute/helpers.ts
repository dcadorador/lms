declare var cordova: any;
// Helper for processing embed video
export const ProcessEmbed = (doc) => {
  // get all embedded elements
  let embeds = Array.from(doc.querySelectorAll(".wp-block-embed"))
  
  // iterate youtube figures
  embeds.forEach((embed:any) => {
    if (typeof embed.getElementsByClassName === 'undefined') {
      return
    }

    // gets url
    var url = embed.getElementsByClassName("wp-block-embed__wrapper")[0].innerHTML

    // check what type of embed
    var isYT = embed.classList.contains("is-provider-youtube")
    var isSpotify = embed.classList.contains("is-provider-spotify")

    // Youtube
    if (isYT) {
      let splitUrl = url.split("?v=")
      let id = splitUrl.length >= 2 ? splitUrl[1] : ''
      url = id === '' ? '' : "https://www.youtube.com/embed/" + id  

    // Spotify
    } else if (isSpotify) {
      let splitUrl = url.split("playlist/")
      let id = splitUrl.length >= 2 ? splitUrl[1] : ''
      url = id === '' ? '' : "https://open.spotify.com/embed/playlist/" + id

    // fallback will create a link instead
    } else {
      url = ''
    }


    // only create iframe when url is valid
    if (url !== '') {

      console.log('embed: ', embed)

      // creates iframe for embedding object
      var iframe = doc.createElement("iframe")     
      iframe.src = url.trim()
      iframe.setAttribute("frameborder", "0") 
      iframe.setAttribute("width", "100%")
      iframe.setAttribute("height", "100%")

      embed.appendChild(iframe)

    // create link
    } else {
      var p = doc.createElement("p")
      var a = doc.createElement("a")
      let url = embed.getElementsByClassName("wp-block-embed__wrapper")[0].innerHTML
      a.innerHTML = url
      a.setAttribute("href", url)
      a.setAttribute("target", "_blank")
      p.appendChild(a)
      embed.appendChild(p)
      embed.style.height = "auto";
    }
  })
}


// Process Links
export const ProcessLinks = (doc) => {
  var links = Array.from(doc.getElementsByTagName('a'))
  links.forEach((link: any) => {
    // checks element
    if (typeof link.addEventListener === 'undefined') {
      return
    }

    // add listener to thank link
    link.addEventListener('click', (e) => {
      e.preventDefault()

      console.log('process link', e, link.getAttribute('href'))
      let href = link.getAttribute('href')
      let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(href);
      if (valid) {
        //window.open(href, '_system', 'location=yes')
        if(cordova && cordova.InAppBrowser){
          window.open = cordova.InAppBrowser.open(href,"_system","location=yes");
        }
       }
    }, false)

  })
}

export const ProcessBlocks = (content, context, doc) => {
  let blocks = content.split("\n\n");
  let customContent = "";
  blocks.forEach(block => {
    let setting = block.split("\n")[0] // get the first comment tag setting
    setting = setting.replace("\\","")

    // first check if an object string is available
    if (setting.indexOf("{") > 0) {
      // get object now

      let key = setting.substring(4, setting.indexOf('{')).trim()

      let objSTR = setting.substring(setting.indexOf('{'), setting.lastIndexOf('}') + 1)
      let custom = JSON.parse(objSTR)


      console.log('custom setting: ', key)

      if (key === "wp:gravityforms/form") {
        console.log("gravity form this", custom)        
        // blockProcessed.push('')
        block =  "<div id='form-quiz' no-padding></div>"
        context.is_taking_quiz = true
        // context.getQuizGF(custom.formId)
        context.apiService.postForm(custom.formId)
          .subscribe(
            data => {
              let quiz = data.data.structure
              quiz.has_description = custom.description == null || custom.description
              quiz.has_title = custom.title == null || custom.title
              quiz.input_index = []
              context.wb_minute_quiz.unshift(quiz)
              console.log('quiz: ', quiz)
            },
            error => {
              console.log('form data error: ', error)
            }
          )
      }
    }

    customContent += block
    
  })

  return customContent
}

export const CheckDiff = (first, second) => {
  for (var i=0; i<second.length; i++) {
      var index = undefined;
      while ((index = first.indexOf(second[i])) !== -1) {
          first.splice(index, 1);
      }
  }
  return first;
}