(function($) {
    'use strict';
    const NAMESPACE = 'SplitContainer';
 
     const DIRECTIVES ={
         row:  {
             mode:'row',
             coord:'pageX',
             size:'width',
             innerSize:'innerWidth',
             outerSize:'outerWidth',
             cursor:'col-resize'
         },
         column: {
             mode:'column',
             coord:'pageY',
             size:'height',
             innerSize:'innerHeight',
             outerSize:'outerHeight',
             cursor:'row-resize'
 
         } 
     };
     // Define a namespace constant
    
     /**
      * Plugin constructor
      * @param {Node} element
      * @param {Object} [options]
      * @api public
      */
      function Plugin (element, options) {
         this.options =options;
         this.$element = $(element);
     
     }
 
     /**
      * Plugin prototype
      * @type {Object}
      * @api public
      */
     Plugin.prototype = {
         constructor: Plugin,
         version: '1.0.0',
         /**
          * Init method
          * @api public
          */
         init: function () {
             console.log(this.options)
             // add class 
             this.$element.addClass('scontainer');
              // retrieve directive 
              this.d = DIRECTIVES[this.options.mode];
              // set direction
              this.$element.css('flex-direction',this.d.mode);  
              // Add panels
              this.panels().add('append',this.options.panels,false);  
              // set cursor direction
              this.$element.find('.scontainer-separator').css('cursor',this.d.cursor);
              
              
      
              this.initializeEvents();
              this.updateControls();
              this.updatePanels();
              }, 
         panels:function(selector='',findDescendants=true){ 
                 
                  return new class{
                  constructor(base,selector){
                 
                      this.base = base;
                      this.selected=[];
                     
                      this.retrieve(selector,findDescendants);
                  }
          
                
                  hide(){ 
                     
                      if(this.selected.length==0)return;
                      this.selected.each((i,el)=>{
                      
                          let $element = $(el);
                      // if first then hide the separator in the right, else the one in the left
                     if($element[0] ==this.base.$element.find('div:visible')[0]){
                      $element.next().hide(); 
                     }else{
                      $element.prev().hide(); 
                     }
                   
                      $element.hide(); 
                     
                  
                      
                    // if(this.base.$element.find('div:visible:first').hasClass('scontainer-separator')) this.base.$element.find('div:visible:first').hide();
                   //  if(this.base.$element.find('div:visible:last').hasClass('scontainer-separator')) this.base.$element.find('div:visible:last').hide();
                      });
                      this.base.$element.trigger("hidepanel",this.selected);
                      this.base.updatePanels();
                
                  }
                  show(){
                      this.selected.each((i,el)=>{  
                      let $element = $(el);
                      // show separators
                 
                      if($element[0] ==this.base.$element.find('div:not(:visible)')[0]){
                          $element.next().show(); 
                         }else{
                          $element.prev().show(); 
                         } 
                  
                      //show
                         $element.show(); 
                     
                      });
                      this.base.updatePanels();
                      this.base.$element.trigger("showpanel",this.selected);  
                      
                  }
                  lock(){
                 
                      this.selected.each((i,el)=>{  
                          let $element = $(el); 
                          if($element.attr('locked')=="true")return;
                          $element.attr('locked',true);
              
                        //  save previous
                          let tmax,tmin;
                          tmax = 'max-'+this.base.d.size;
                          tmin = 'min-'+this.base.d.size;
                          
                          // store previous
                          $element.data(tmax, $element.css(tmax));
                          $element.data(tmin, $element.css(tmin));
                           
                          // lock boundaries
                          $element.css(tmax,$element[this.base.d.outerSize]());
                         $element.css(tmin,$element[this.base.d.outerSize]());
                 
                        
                      });
                    //  this.base.updatePanels();
                      this.base.$element.trigger("lockpanel",this.selected);
                  }
                  unlock(){
                      this.selected.each((i,el)=>{  
                          let $element = $(el);
                          if($element.attr('locked')=="false")return;
                          $element.attr('locked',false);
              
                          let tmax,tmin;
                          tmax = 'max-'+this.base.d.size;
                          tmin = 'min-'+this.base.d.size;
                          
                          //set the size 
                          $element.css(this.base.d.size,$element.css(tmax));
              
                          // restore previous boundaries
                          $element.css(tmax, $element.data(tmax));
                          $element.css(tmin, $element.data(tmin));
                      
                      });
                      this.base.updatePanels();
                      this.base.$element.trigger("unlockpanel",this.selected);
                  }
                  append(elements){
                      this.add('append',elements);
                  }
                  prepend(elements){
                      this.add('prepend',elements);
                  }
                  remove(el){
                      this.selected.each((i,el)=>{  
                          let $element = $(el);
                          if($element instanceof $){   
          
                                 // if first then hide the separator in the right, else the one in the left
                     if($element[0] ==this.base.$element.find('div:visible')[0]){
                      $element.next().remove(); 
                     }else{
                      $element.prev().remove(); 
                     }
                              // // remove separator 
                              // if(!$element.is(':first-child')) $element.prev().remove();
                              // if($element.is(':first-child')) $element.next().remove();
                              
              
                    
                          $element.remove();
                           
                          
                       }  
                      
                  });
                  this.base.updatePanels(); 
                  this.base.$element.trigger("removepanel",this.selected);
                 
                     
          
          
                  }
                  // privs
                  retrieve(selector,findDescendants){
              
          
                      let findMode = findDescendants ? 'find':'children';
 
                   //   console.log((typeof selector =='string' && selector!='' && !isNaN(selector)))
                      // string number parsing
                      if((typeof selector =='string' && selector!='' && !isNaN(selector)))selector = parseInt(selector);
                    //  console.log(selector , typeof selector)
      
                       if(typeof selector =='number') selector = [selector];
                     console.log(selector)
                       // array of numbers (indexes)
                     if(Array.isArray(selector)){ this.selected =   this.base.$element[findMode]('.scontainer-panel').filter(function(i) { return $.inArray(i, selector) > -1;});return; }
                         
                 
                      // jquery selector
                      if(typeof selector =='string') {this.selected = this.base.$element[findMode]('.scontainer-panel'+(selector||'')); return;}
                     
                      
                      
                      console.warn('SplitContainer: '+selector +' is not a valid selector');
                      
                            
                          } 
                  add(mode,el,update=true){ 
                      
                      if(!Array.isArray(el) && typeof el =='object') {   
                          
                          let separator = el.separator ? el.separator : this.base.options.separator;
                          separator.class = 'scontainer-separator'+ ( (separator.class!=null && separator.class!=undefined && separator.class!='') ? " "+separator.class:'');
                          let $separator =$('<div>',separator); 
          
          
          
                       //   if(mode=='append' && this.base.$element.children('.scontainer-panel').length>0)   this.base.$element.append($separator);
          
          
                          delete el['separator'];
                          let $panel = $('<div>',el);
                          $panel.addClass('scontainer-panel');  
                          if(typeof this.base.options.on.clickpanel==='function'){$panel.on('click',(e)=>{this.base.options.on.clickpanel(e);});}
                        
          
                          this.base.$element[mode]($panel);  
                           if($panel.attr('locked')=='true'){this.base.panels([this.base.$element.children('.scontainer-panel').index($panel[0])]).lock($panel);} // TODO !
                          
                          if(mode=='prepend'){
                              if(this.base.$element.children('.scontainer-panel').length>1) $separator.insertAfter($panel);
                          }else{
                              if(this.base.$element.children('.scontainer-panel').length>1) $separator.insertBefore($panel);
          
                          }
                          
                        //   if(mode=='prepend' && this.base.$element.children('.scontainer-panel').length>0)   this.base.$element.append($separator);
                        
                        
                           this.base.$element.trigger("addpanel",$panel);
          
                      
                      } else if(Array.isArray(el)){
                          el.forEach(e => {  this.base.panels().add(mode,e,false); });
                    
                      }else{
                          console.error('el must be an object or an array');
                          return;
                      }
                      
                      if(update){
                          this.base.updateControls(); 
                          this.base.updatePanels(); 
                          
                      }
          
                  
                  }
              }(this,selector);
          },
         updatePanels:function(){  
       
              // Compensation panels
      
      
              let $cp = this.$element.find(`.scontainer-panel:not([style*='${this.d.size}']):not('[locked="true"]'):visible:last`); 
              if($cp.length==0)$cp =   this.$element.find(`.scontainer-panel:not('[locked="true"]'):visible:last`) ;
              if($cp.length==0)$cp =   this.$element.find(`.scontainer-panel:visible:last`);
              
              // if no then return ??  
              if( $cp.length==0) {console.error('SplitContainer: No compensation panel found.');return;};
          
            //total space 
               let ts = this.$element[this.d.innerSize](); 
          
              // Fixed space
                 let fs = 0; 
              
               //  this.$element.find(`.scontainer-panel[locked="true"]:visible`).each((i,e)=>{ 
                   this.$element.find(`.scontainer-panel[style*='${this.d.size}']:visible`).each((i,e)=>{ 
                //  this.$element.find(`.scontainer-panel:visible`).each((i,e)=>{ 
                       
                      // panel
                      fs+=$(e)[this.d.outerSize]();    
                      // separator 
                   
                      if($(e).parent().children('.scontainer-panel').index(e)>0){ fs+=$(e).prev()[this.d.outerSize]();}// separators
                      }
                      ); 
              // Remaining space  
              $cp[this.d.size]( $cp[this.d.size]() + (ts-fs));  
          
              // set size to those that dotn have size 
           this.$element.find(`.scontainer-panel:not([style*='${this.d.size}']):visible`).each((i,e)=>{
              $(e).css(this.d.size,$(e)[this.d.outerSize]());
           });
          
            
          
              },
          updateControls:function(){
              
              
          // mouse stuff 
            let start, initialPrev,initialNext;
            let  $separator=null;
            
      
      
            this.$element.find('.scontainer-separator').off('mousedown'); 
            this.$element.find('.scontainer-separator').mousedown((e)=> { 
              e.preventDefault();
              e.stopPropagation(); 
              // check locked panels   
              $separator = $(e.target);  
              // find previous and next unlocked visible panels 
              let $p = $separator.prevAll(`.scontainer-panel:not('[locked="true"]'):visible:first`);
              let $n = $separator.nextAll(`.scontainer-panel:not('[locked="true"]'):visible:first`);
      
         // check first and last locks 
              if($p.length==0 || $n.length==0) {$separator=null;return;} 
          // max possible space 
           let max = $p[this.d.size]()+$n[this.d.size]();
      
           
          start = e[this.d.coord];
          initialPrev = $p[this.d.size]();
          initialNext = $n[this.d.size](); 
              $(document).mousemove( (e) =>{
                if ($separator) {
                 
                  const diff = e[this.d.coord] - start;
                  let prev = initialPrev + diff;
                  let next = initialNext - diff;
                   
                   
              // Boundaries
              if(prev>=max){prev=max;next=0;}
              if(next>=max){next=max;prev=0;}
      
      
      
            
       
                      $p[this.d.size](prev);
                      $n[this.d.size](next);
                
             
                }
              });
      
              $(document).mouseup((e)=> {
                if ($separator) { 
                  $separator=null;
                    $(document).off('mousemove'); 
                    $(document).off('mouseup');
                }
              });
          });
      
               // custom events 
             
      
          } ,
          initializeEvents:function(){
     
              let events = ['addpanel','removepanel','showpanel','hidepanel','lockpanel','unlockpanel','clickpanel'];
      
              events.forEach(event => {
                  this.$element.off(event);
                  this.$element.on(event,  (e,panel)=> {
                      e.container = e.target;
                      e.target = panel;
                      
                       this.$element.data('fn.' + NAMESPACE).options.on[event](e) 
                       });
                
              });
          } 
         // @todo add methods
     };
 
 
             // Define the plugin function
     $.fn[NAMESPACE] = function(options) {
         // Default options
         var defaults ={  
         mode: 'row', // column or row  
         separator:{style:'background-color:black;min-width:6px;min-height:6px'},
         on:{},
         panels:[]
         };
         // Merge defaults with user-defined options
         options = $.extend({}, defaults, options);
  
         // Iterate over each matched element
         return this.each(function() {
             var $element = $(this);
             window.test = (window.test?window.test++:0);
             console.log(this,window.test)
             // Store the options specific to this instance under the namespace
             let instance =  $element.data('fn.' + NAMESPACE); 
             if (!instance)  {
                 $element.data('fn.' + NAMESPACE, (instance = new Plugin(this, options)));
                 instance.init();
             }; 
            
 
         });
     };
 })(jQuery);
 