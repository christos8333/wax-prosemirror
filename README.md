<div width="100%" align="center">
  <h1>Wax Editor</h1>
</div>

| [![MIT license](https://img.shields.io/badge/license-MIT-e51879.svg)](https://gitlab.coko.foundation/wax/wax-prosemirror/raw/master/LICENSE) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

This application is being developed by the [Coko Foundation](https://coko.foundation/), for the [University of California Press](http://www.ucpress.edu/) as part of the [Editoria](https://gitlab.coko.foundation/editoria/editoria/) application.

Wax Editor is build against Prosemirror libraries. Check Prosemirror [website](https://prosemirror.net/) and [GitHub repo](https://github.com/ProseMirror) for more information. 

Wax is a Monorepo that consists of several packages.

<h3> wax-prosemirror-core </h3>

Core holds all the funcionality of 

<h3> wax-prosemirror-schema </h3>

Schema consists of all the different nodes/marks currently supported by the editor.

<h3> wax-prosemirror-components </h3>

React components

<h3> wax-prosemirror-themes </h3>

<h3> wax-prosemirror-layouts </h3>

<h3> wax-prosemirror-utilities </h3>
 
 <h3> Editors </h3>
 
 Editors are private pakages inside the monorepo, for development/demo purposes.

## Table of Contents
- [Get up and running](#get-up-and-running)

## Get up and running

Run a local version of the editor
  
1)  `git@gitlab.coko.foundation:wax/wax-prosemirror.git`
  
2) `yarn with node > 11`
  
3) `yarn editoria` Will bring up a demo of the Editoria Ediitor

4) `yarn default` Will bring up a basic version will only an editing surface accepting paragragraphs

Scripts: `yarn` , `yarn clean`, `yarn reset`
