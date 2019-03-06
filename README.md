# Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)


A D3 scatter plot showing the relationship between two data variables: `Income Level` and `Smokers%`.

D3 scatter plot that represents each state with circle elements. This graphic is coded in the `app.js`, pulling in the data from `data.csv` by using the `d3.csv` function. The scatter plot should ultimately appear like the image at the top.

* Includes state abbreviations in the circles.

* Situates axes and labels to the left and bottom of the chart.

* Note: Need to use `python -m http-server` to run the visualization. This will host the page at `localhost:8000` in the web browser.

####  Incorporates d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: these reveal a specific element's data when the user hovers their cursor over the element. This example uses the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged)—we've already included this plugin in your assignment directory.

![8-tooltip](images/8-tooltip.gif)

