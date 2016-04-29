<h1>Converting XML Response to JSON for Angular Templates</h1> 
<p><a href="#noTag">No Live URL, in Early Development</a></p>
<h2>Motivation</h2>
<ul>
    <li>XML is more readable than JSON</li>
    <li>Edit XML - - > push to server</li>
    <li>Let client, browser, perform the conversion</li>
</ul>
<h2>Current State</h2>
<ul>
    <li>In Development</li>
</ul>
<h2>Using, but not limited to:</h2>
<ul>
    <li>Primitive JavaScript</li>
    <li>Object oriented JavaScript</li>
    <li>jQuery</li>
    <li>Angular.js</li>
    <li>Angular Services</li>
    <li>Bootstrap</li>   
    <li>CSS3</li>   
    <li>Custom RegEx Library</li>
    <li>XML</li>
    <li>JSON</li>
</ul>
<h3>Stategies and Techniques</h3>
<ul>
    <li>Custom JS libraries for code reusabiltiy</li>
    <li>Angular services to consume custom Js libraries</li>
    <li>XML for server side data</li>
    <li>Custom XML to JSON converter</li>
    <li>Bootstrap for responsive design</li>
</ul>
</ul>
<h4>Fundemental Architecture</h4>
<div>
    <pre>
        <code>
            ├── site
            │   ├── index.html
            │   ├── README.md
            │   ├── data
            │   │   └── index.json
            │   │   └── index.xml
            │   ├── scripts
            │   │   └── main.js
            │   │   └── regex.js
            │   │
            │   ├── bower_components
            │   │               └── angular
            │   │               └── font-awesome
            │   │               └── jquery
            │   │               └── jquery                      
            │   │ 
            │   ├── styles
            │   │   └── main.css
            
        </code>
    </pre>
</div>


 

 
