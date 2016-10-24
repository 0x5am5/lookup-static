export const AppComponent = {
  template: `
  	<header>
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="index.html">LookUp</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><a href="about.html">About</a></li>
					</ul>
				</div>
			</div>
		</nav>	
	</header>
    <main>
		<div class="container">
			<div class="logo">
				<h1 class="sr-only">Lookup</h1>
				<span class="logo__text">Lookup</span>
				<span class="logo__text logo__text--red js-logo-text">Lookup</span>
				<span class="logo__text logo__text--yellow js-logo-text">Lookup</span>
				<span class="logo__text logo__text--green js-logo-text">Lookup</span>
				<span class="logo__text logo__text--blue js-logo-text">Lookup</span>
			</div>

			<p>The lookup app allows you to discover the worlds around you. Without looking up.</p>

			<div class=status-box>
				<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
				<span class="sr-only">Loading...</span>
			</div>

        	<div ui-view></div>

			<ul class="results list-unstyled"></ul>
		</div>
	</main>
	<footer>
		<div class="footer navbar-inverse">
			<div class="container">
				<h2>Sitemap</h2>
				<nav>
					<ul class="list-unstyled">
						<li>
							<a href="index.html">The App</a>
						</li>
						<li>
							<a href="about.html">About</a>
						</li>
					</ul>
				</nav>
				Copywrite 2016 Sam Gregory
			</div>
		</div>
	</footer>
  `
};