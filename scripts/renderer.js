class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        var LB = {x: 200, y: 200}; 
        var RT = {x: 600, y: 500}; 
        this.drawRectangle(LB, RT, [255, 0, 0, 255], framebuffer); 
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        //TODO draw circle
        this.drawCircle({x: 400, y: 350}, 150, [0, 200, 0, 255], framebuffer); 
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        //TODO draw bezier curve
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        //TODO draw name
        this.drawLine({x: 50, y: 100}, {x: 300, y: 250}, [255, 0, 0, 255], framebuffer); //up flattish red left- first
        this.drawLine({x: 300, y: 250}, {x: 50, y: 100}, [255, 0, 0, 255], framebuffer); //up flattish red right- first
        this.drawLine({x: 50, y: 250}, {x: 300, y: 100}, [35, 200, 10, 255], framebuffer); //down flattish greenish left- first 
        this.drawLine({x: 300, y: 100}, {x: 50, y: 250}, [35, 200, 10, 255], framebuffer); //down flattish greenish right- first
        
        this.drawLine({x: 350, y: 100}, {x: 450, y: 500}, [65, 80, 235, 255], framebuffer); //up steep blueish left- first
        this.drawLine({x: 450, y: 500}, {x: 350, y: 100}, [65, 80, 235, 255], framebuffer); //up steep blueish right- first
        this.drawLine({x: 350, y: 500}, {x: 450, y: 100}, [235, 80, 235, 255], framebuffer); //down steep purplish left- first BROKEN
        this.drawLine({x: 450, y: 100}, {x: 350, y: 500}, [235, 80, 235, 255], framebuffer); //down steep purplish right- first BROKEN
        
        this.drawLine({x: 175, y: 100}, {x: 175, y: 250}, [230, 230, 0, 255], framebuffer); //up straight orange down- first
        this.drawLine({x: 175, y: 100}, {x: 175, y: 250}, [230, 230, 0, 255], framebuffer); //up straight orange up- first
        this.drawLine({x: 350, y: 295}, {x: 450, y: 295}, [0, 230, 235, 255], framebuffer); //flat straight cyan left- first
        this.drawLine({x: 350, y: 295}, {x: 450, y: 295}, [0, 230, 235, 255], framebuffer); //flat straight cyan right- first
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawRectangle(left_bottom, right_top, color, framebuffer) {
        //TODO drawRectangle()
        var LB, LT, RB, RT; 
        LB = left_bottom; 
        LT = {x: left_bottom.x, y: right_top.y}; 
        RB = {x: right_top.x, y: left_bottom.y}; 
        RT = right_top; 
        
        this.drawLine(LB, LT, color, framebuffer); 
        this.drawLine(LT, RT, color, framebuffer); 
        this.drawLine(RT, RB, color, framebuffer); 
        this.drawLine(RB, LB, color, framebuffer); 
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, color, framebuffer) {
        var curve_radians = (2*Math.PI) / this.num_curve_sections; //there are 2pi radians in a circle
        var points = new Array(); 
        
        for(var i = 0; i < this.num_curve_sections; i++) {
            points.push({x: undefined, y: undefined}); 
            points[i].x = center.x + radius * Math.cos(curve_radians * i); 
            points[i].y = center.y + radius * Math.sin(curve_radians * i); 
        }
        
        for(var i = 0; i < this.num_curve_sections; i++) {
            this.drawLine(points[i], points[(i + 1) % this.num_curve_sections], [0, 200, 0, 255], framebuffer); 
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer) {
        //TODO drawBezierCurve()
    }
    
    drawPoint(pt, color, framebuffer) {
        this.drawLine({x: pt.x - 2, y: pt.y - 2}, {x: pt.x + 2, y: pt.y - 2}, color, framebuffer, true); 
        this.drawLine({x: pt.x + 2, y: pt.y - 2}, {x: pt.x + 2, y: pt.y + 2}, color, framebuffer, true); 
        this.drawLine({x: pt.x + 2, y: pt.y + 2}, {x: pt.x - 2, y: pt.y + 2}, color, framebuffer, true); 
        this.drawLine({x: pt.x - 2, y: pt.y + 2}, {x: pt.x - 2, y: pt.y - 2}, color, framebuffer, true); 
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawLine(pt0, pt1, color, framebuffer, for_point = false) {
        var x0 = Math.floor(pt0.x); 
        var y0 = Math.floor(pt0.y); 
        var x1 = Math.floor(pt1.x); 
        var y1 = Math.floor(pt1.y); 
        
        if(this.show_points && !for_point) {
            this.drawPoint(pt0, color, framebuffer); 
            this.drawPoint(pt1, color, framebuffer); 
        }
        
        //find the direction and slope
        var dy = y1 - y0;
        var dx = x1 - x0;
        
        //slope is flattish, draw f(x)
        if (Math.abs(dx) > Math.abs(dy)) {
            //draw left to right
            if(x0 > x1) {
                let temp; 
                temp = x0; 
                x0 = x1; 
                x1 = temp; 
                temp = y0; 
                y0 = y1; 
                y1 = temp; 
                dx *= -1; 
                dy *= -1; 
            }
            this.drawLineLow(dx, dy, x0, y0, x1, y1, color, framebuffer); 
        }
        
        //slope is uppish, draw g(y)
        else {
            //draw bottom to top
            if(y0 > y1) {
                let temp; 
                temp = x0; 
                x0 = x1; 
                x1 = temp; 
                temp = y0; 
                y0 = y1; 
                y1 = temp; 
                dx *= -1; 
                dy *= -1; 
            }
            this.drawLineHigh(dx, dy, x0, y0, x1, y1, color, framebuffer); 
        }
    }
    
    drawLineLow(dx, dy, x0, y0, x1, y1, color, framebuffer)
    {
        var iy = 1; //Drawing up, or down? 
        
        if (dy < 0) {
            iy = -1;
            dy *= -1;
        }
        
        var d = 2 * dy - dx;
        
        while (x0 <= x1) {
            this.setPixel(framebuffer, this.coordsToPixel(x0, y0, framebuffer), color);
            x0++;
            
            if (d <= 0) {
                d += 2 * dy;
            } else {
                d += 2 * dy - 2 * dx;
                y0 += iy;
            }
        }
    }
    
    drawLineHigh(dx, dy, x0, y0, x1, y1, color, framebuffer)
    {
        //Drawing up, or down? 
        var ix = 1; 
        if (dx < 0) { 
            ix = -1;
            dx *= -1;
        }
        
        //the determinator
        var d = 2 * dy - dx;
        
        while (y0 <= y1) {
            this.setPixel(framebuffer, this.coordsToPixel(x0, y0, framebuffer), color);
            y0++;
            
            if (d <= 0) {
                d += 2 * dx;
            } else {
                d += 2 * dx - 2 * dy;
                x0 += ix;
            }
        }
    }

    coordsToPixel(x, y, framebuffer) {
        return 4 * y * framebuffer.width + 4 * x;
    }
    
    //gives a color to a pixel
    setPixel(framebuffer, px, color) {
        framebuffer.data[px + 0] = color[0];
        framebuffer.data[px + 1] = color[1];
        framebuffer.data[px + 2] = color[2];
        framebuffer.data[px + 3] = color[3];
    }
};
