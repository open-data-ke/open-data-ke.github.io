import React, { Component } from 'react';
import App from '../App';

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <div className="container wow fadeInUp delay-03s mb-0 pt-0">
            <div className="row">
              <div className="logo text-center">
                <p ltyle="fontSize: 20px;"><b>Extractive Information</b></p>
                <h2>Extractive Informations Mining Oil and Gas</h2>
              </div>
            </div>
          </div>
          <section id="about wow fadeInUp delay-03s" className="section-padding">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-sm-12 text-center">
                  <div className="about-title">
                    <h2>About Us</h2>
                    <p>A collaborative platform that contains all extractive informations for informed citizenly</p>
                  </div>
                  <div className="col-md-3 col-sm-6 col-xs-12 wow fadeInUp delay-02s">
                    <div className="img">
                      <i className="fa fa-refresh"></i>
                    </div>
                    <h3 className="abt-hd">Our process</h3>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                  </div>
                  <div className="col-md-3 col-sm-6 col-xs-12 wow fadeInUp delay-04s">
                    <div className="img">
                      <i className="fa fa-eye"></i>
                    </div>
                    <h3 className="abt-hd">Our Vision</h3>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                  </div>
                  <div className="col-md-3 col-sm-6 col-xs-12 wow fadeInUp delay-06s">
                    <div className="img">
                      <i className="fa fa-cogs"></i>
                    </div>
                    <h3 className="abt-hd">Our Approach</h3>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                  </div>
                  <div className="col-md-3 col-sm-6 col-xs-12 wow fadeInUp delay-08s">
                    <div className="img">
                      <i className="fa fa-dot-circle-o"></i>
                    </div>
                    <h3 className="abt-hd">Our Objective</h3>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2 className="subs-title text-center">Subscribe now to get Recent updates!!!</h2>
            <div className="subcription-info text-center">
              <form className="subscribe_form" action="#" method="post">
                <input required="" value="" placeholder="Enter your email..." className="email" id="email" name="email" type="email"/>
                <input className="subscribe" name="email" value="Subscribe!" type="submit"/>
              </form>
              <p className="sub-p">We Promise to never span you.</p>
            </div>
          </section>
          <section style={{marginBottom:'30px'}}>
            <div className="container">
              <div className="row bort text-center">
                <div className="social">
                  <ul>
                    <li>
                      <a href="/#"><i className="fa fa-facebook"></i></a>
                    </li>
                    <li>
                      <a href="/#"><i className="fa fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="/#"><i className="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <div id="contact-info">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="contact-title">
                  {/*<i className="fa fa-envelope"></i>
                    <h2>Get in touch</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor <br/>incididunt ut labore et dolore magna aliqua.</p>
                    */}
                    <App/>
                  </div>
                </div>
                <div className="contact col-md-6 wow fadeIn delay-08s">
                  <div className="col-md-10 col-md-offset-1">
                    <div id="note"></div>
                    <div id="sendmessage">Your message has been sent. Thank you!</div>
                    <div id="errormessage"></div>
                    <form action="" method="post" className="contactForm">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                        <div className="validation"></div>
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                        <div className="validation"></div>
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                        <div className="validation"></div>
                      </div>
                      <div className="form-group">
                        <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                        <div className="validation"></div>
                      </div>

                      <div className="text-center"><button type="submit" className="contact-submit">Send Message</button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="row bort">

              <div className="copyright" style={{fontFamily:'sans-serif'}}>
                © Copyright Extractive Mining Oil and Gas. All rights reserved.
                <div className="credits">
                  Designed by <a href="/">Extractive Informations</a>
                </div>
              </div>

            </div>
          </div>
        </footer>
      </div>
    );
  }
}
