// vite.config.ts
import path from "path";
import { defineConfig } from "file:///Users/theoletouze/Documents/IMT/S5/filles-du-numerique/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/theoletouze/Documents/IMT/S5/filles-du-numerique/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///Users/theoletouze/Documents/IMT/S5/filles-du-numerique/node_modules/unplugin-vue-components/dist/vite.mjs";
import Pages from "file:///Users/theoletouze/Documents/IMT/S5/filles-du-numerique/node_modules/vite-plugin-pages/dist/index.mjs";
import Layouts from "file:///Users/theoletouze/Documents/IMT/S5/filles-du-numerique/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Icons from "file:///Users/theoletouze/Documents/IMT/S5/filles-du-numerique/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///Users/theoletouze/Documents/IMT/S5/filles-du-numerique/node_modules/unplugin-icons/dist/resolver.mjs";
import { VitePluginFonts } from "file:///Users/theoletouze/Documents/IMT/S5/filles-du-numerique/node_modules/vite-plugin-fonts/dist/index.js";
var __vite_injected_original_dirname = "/Users/theoletouze/Documents/IMT/S5/filles-du-numerique";
var vite_config_default = defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/colors.scss";'
      }
    }
  },
  build: {
    cssCodeSplit: false
  },
  resolve: { alias: { "@": `${path.resolve(__vite_injected_original_dirname, "src")}/` } },
  optimizeDeps: {
    include: [
      "vue"
    ]
  },
  plugins: [
    Icons({
      autoInstall: true
    }),
    Pages({
      pagesDir: [
        { dir: "src/views", baseRoute: "" }
      ],
      extensions: ["vue"],
      syncIndex: true
    }),
    Layouts(),
    Components({
      resolvers: [
        IconsResolver()
      ],
      dirs: ["src/components", "src/views"],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts"
    }),
    vue(),
    VitePluginFonts({
      google: {
        families: [{
          name: "Open Sans",
          styles: "wght@100;200;300;400;500;600;700;800"
        }]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGhlb2xldG91emUvRG9jdW1lbnRzL0lNVC9TNS9maWxsZXMtZHUtbnVtZXJpcXVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGhlb2xldG91emUvRG9jdW1lbnRzL0lNVC9TNS9maWxsZXMtZHUtbnVtZXJpcXVlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90aGVvbGV0b3V6ZS9Eb2N1bWVudHMvSU1UL1M1L2ZpbGxlcy1kdS1udW1lcmlxdWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJ1xuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcbmltcG9ydCB7IFZpdGVQbHVnaW5Gb250cyB9IGZyb20gJ3ZpdGUtcGx1Z2luLWZvbnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkAvYXNzZXRzL3Njc3MvY29sb3JzLnNjc3NcIjsnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gIH0sXG5cbiAgcmVzb2x2ZTogeyBhbGlhczogeyAnQCc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCB9IH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICd2dWUnLFxuICAgIF0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBJY29ucyh7XG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBQYWdlcyh7XG4gICAgICBwYWdlc0RpcjogW1xuICAgICAgICB7IGRpcjogJ3NyYy92aWV3cycsIGJhc2VSb3V0ZTogJycgfSxcbiAgICAgIF0sXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxuICAgICAgc3luY0luZGV4OiB0cnVlLFxuICAgIH0pLFxuICAgIExheW91dHMoKSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBJY29uc1Jlc29sdmVyKCksXG4gICAgICBdLFxuICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cycsICdzcmMvdmlld3MnXSxcbiAgICAgIC8vIGFsbG93IGF1dG8gbG9hZCBtYXJrZG93biBjb21wb25lbnRzIHVuZGVyIGAuL3NyYy9jb21wb25lbnRzL2BcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG4gICAgICAvLyBhbGxvdyBhdXRvIGltcG9ydCBhbmQgcmVnaXN0ZXIgY29tcG9uZW50cyB1c2VkIGluIG1hcmtkb3duXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXG4gICAgfSksXG4gICAgdnVlKCksXG4gICAgVml0ZVBsdWdpbkZvbnRzKHtcbiAgICAgIGdvb2dsZToge1xuICAgICAgICBmYW1pbGllczogW3tcbiAgICAgICAgICBuYW1lOiAnT3BlbiBTYW5zJyxcbiAgICAgICAgICBzdHlsZXM6ICd3Z2h0QDEwMDsyMDA7MzAwOzQwMDs1MDA7NjAwOzcwMDs4MDAnLFxuICAgICAgICB9XSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VixPQUFPLFVBQVU7QUFDeFcsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsdUJBQXVCO0FBUmhDLElBQU0sbUNBQW1DO0FBVXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBRUEsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUcsS0FBSyxRQUFRLGtDQUFXLEtBQUssS0FBSyxFQUFFO0FBQUEsRUFDaEUsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0osVUFBVTtBQUFBLFFBQ1IsRUFBRSxLQUFLLGFBQWEsV0FBVyxHQUFHO0FBQUEsTUFDcEM7QUFBQSxNQUNBLFlBQVksQ0FBQyxLQUFLO0FBQUEsTUFDbEIsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLE1BQ1QsV0FBVztBQUFBLFFBQ1QsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxNQUFNLENBQUMsa0JBQWtCLFdBQVc7QUFBQSxNQUVwQyxZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUEsTUFFeEIsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsTUFDekMsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLElBQ0osZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsUUFDTixVQUFVLENBQUM7QUFBQSxVQUNULE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
