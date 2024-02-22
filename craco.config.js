const CracoAlias = require("craco-alias");

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: "jsconfig",
				baseUrl: "./src",
			},
		},
	],
	babel: {
		presets: [
			"@babel/preset-env",
			["@babel/preset-react", { runtime: "automatic" }],
			
		],
		plugins: [
			["@babel/plugin-proposal-class-properties", { loose: true }],
			[
				"@babel/plugin-proposal-private-property-in-object",
				{ loose: true },
			],
			["@babel/plugin-proposal-private-methods", { loose: true }],
			['@babel/plugin-proposal-optional-chaining',{ loose: true }],
			 [
				"@babel/plugin-proposal-nullish-coalescing-operator"
			],
		],
	},
	webpack: {
		configure: {
			module: {
				rules: [
					{
						test: /\.js$/,
						loader: require.resolve(
							"@open-wc/webpack-import-meta-loader"
						),
					},
				],
			},
		},
	},
};
