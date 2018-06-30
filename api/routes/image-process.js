var cloudinary = require('cloudinary');
const express = require('express');
const router = express.Router();

cloudinary.config({ 
    cloud_name: 'bms112233', 
    api_key: '917379386923418', 
    api_secret: '855TKFNFR76n4wqm-LnRc-cNhoI' 
  });

//   router.get('', function(req, res) {
//     cloudinary.uploader.upload("fonts/VNI-Thuphap1.ttf", function(result) { 
//         console.log(result)
//         res.send(result)
//       }, {
//         resource_type: 'raw',
//         type: 'authenticated', 
//         public_id: 'VNI-Thuphap1.ttf'
//       });
//   })

//   router.post('', function(req, res) {
//    var text =  cloudinary.image("tuyet-chieu-chinh-phuc-me-chong_m.jpg", {transformation: [
//     {overlay: "text:Arial_80:Flowers"}
//     ]})
    
//     res.send(text.substring(10, text.length - 4))
//   })

  // API xu ly text-overlay
  router.post('/text-overlay', function(req, res) {
      console.log(req.body)
    if(typeof req.body !== 'undefined' 
    && typeof req.body.text !== 'undefined'
    && typeof req.body.image_name !== 'undefined'
    ){
        var fontsize = 30
        var fontName = "Arial"
        var fontcolor = 'red'
        var x = 0
        var y = 0
        var border_size = 0
        var border_color = "white"
        var border_style = 'solid'
        var background = 'transparent'
        var gravity = undefined// north_east, north, north_west, west, south_west, south, south_east, east, or center

        if(typeof req.body.fontsize !== 'undefined') {
            fontsize = req.body.fontsize
        }

        if(typeof req.body.x !== 'undefined') {
            x = req.body.x
        }

        if(typeof req.body.y !== 'undefined') {
            y = req.body.y
        }

        if(typeof req.body.font_size !== 'undefined') {
            font_size = req.body.font_size
        }

        if(typeof req.body.border_size !== 'undefined') {
            border_size = req.body.border_size
        }

        if(typeof req.body.gravity !== 'undefined') {
            gravity = req.body.gravity
        }

        if(typeof req.body.fontcolor !== 'undefined') {
            fontcolor = req.body.fontcolor
        }

        if(typeof req.body.background !== 'undefined') {
            background = req.body.background
        }

        if(typeof req.body.font_name !== 'undefined') {
            fontName = req.body.font_name
            fontName = encodeURI(fontName)
        }
        
        var html = cloudinary.image(req.body.image_name, {
            overlay: 'text:'+fontName+'_'+ fontsize +':' + encodeURI(req.body.text),
            gravity: gravity,
            x: x,
            y: y,
            color: fontcolor,
            border: border_size + 'px_' + border_style + '_' + border_color, // width_style_color 3px_solid_black
            background: background 
        })
        console.log(html)
        var image_url = html.substring(10, html.length - 4) + '.jpg'
        image_url = encodeURI(image_url)
        res.send({
            messages: [
                {
                    attachment: {
                        type: 'image',
                        payload: {
                            url: image_url
                        }
                    }
                }
            ]
        })
    } else {
        res.send({messages:[{text: 'You are missing parameter!'}]})
    }
  })


  // API xu ly text-cutter
  router.post('/text-cutter', function(req, res) {
    console.log(req.body)
  if(typeof req.body !== 'undefined' 
  && typeof req.body.text !== 'undefined'
  && typeof req.body.image_name !== 'undefined'
  ){
      var fontsize = 48
      var fontName = "Arial"
      var fontcolor = 'red'

      if(typeof req.body.fontsize !== 'undefined') {
          fontsize = req.body.fontsize
      }

      if(typeof req.body.font_size !== 'undefined') {
          font_size = req.body.font_size
      }

      if(typeof req.body.font_name !== 'undefined') {
          fontName = req.body.font_name
          fontName = encodeURI(fontName)
      }
      
      var html = cloudinary.image(req.body.image_name, {
          w: 500,
          overlay: 'text:'+fontName+'_'+ fontsize +':' + encodeURI(req.body.text),
          flags: 'cutter'
      })
      console.log(html)
      var image_url = html.substring(10, html.length - 4) + '.jpg'
      image_url = encodeURI(image_url)
      res.send({
          messages: [
              {
                  attachment: {
                      type: 'image',
                      payload: {
                          url: image_url
                      }
                  }
              }
          ]
      })
  } else {
      res.send({messages:[{text: 'You are missing parameter!'}]})
  }
})

module.exports = router
  