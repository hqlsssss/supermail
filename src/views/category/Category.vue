<template>
  <div class="wrapper" ref="aaa">
<!--    <button @click="btnClick">按钮</button>-->
    <ul class="content">
      <li>数据列表1</li>
      <li>数据列表2</li>
      <li>数据列表3</li>
      <li>数据列表4</li>
      <li>数据列表5</li>
      <li>数据列表6</li>
      <li>数据列表7</li>
      <li>数据列表8</li>
      <li>数据列表9</li>
      <li>数据列表10</li>
      <li>数据列表11</li>
      <li>数据列表12</li>
      <li>数据列表13</li>
      <li>数据列表14</li>
      <li>数据列表15</li>
      <li>数据列表16</li>
      <li>数据列表17</li>
      <li>数据列表18</li>
      <li>数据列表19</li>
      <li>数据列表20</li>
      <li>数据列表21</li>
      <li>数据列表22</li>
      <li>数据列表23</li>
      <li>数据列表24</li>
      <li>数据列表25</li>
      <li>数据列表26</li>
      <li>数据列表27</li>
      <li>数据列表28</li>
      <li>数据列表29</li>
      <li>数据列表30</li>
      <li>数据列表31</li>
      <li>数据列表32</li>
      <li>数据列表33</li>
      <li>数据列表34</li>
      <li>数据列表35</li>
      <li>数据列表36</li>
      <li>数据列表37</li>
      <li>数据列表38</li>
      <li>数据列表39</li>
      <li>数据列表40</li>
      <li>数据列表41</li>
      <li>数据列表42</li>
      <li>数据列表43</li>
      <li>数据列表44</li>
      <li>数据列表45</li>
      <li>数据列表46</li>
      <li>数据列表47</li>
      <li>数据列表48</li>
      <li>数据列表49</li>
      <li>数据列表50</li>
      <li>数据列表51</li>
      <li>数据列表52</li>
      <li>数据列表53</li>
      <li>数据列表54</li>
      <li>数据列表55</li>
      <li>数据列表56</li>
      <li>数据列表57</li>
      <li>数据列表58</li>
      <li>数据列表59</li>
      <li>数据列表60</li>
      <li>数据列表61</li>
      <li>数据列表62</li>
      <li>数据列表63</li>
      <li>数据列表64</li>
      <li>数据列表65</li>
      <li>数据列表66</li>
      <li>数据列表67</li>
      <li>数据列表68</li>
      <li>数据列表69</li>
      <li>数据列表70</li>
      <li>数据列表71</li>
      <li>数据列表72</li>
      <li>数据列表73</li>
      <li>数据列表74</li>
      <li>数据列表75</li>
      <li>数据列表76</li>
      <li>数据列表77</li>
      <li>数据列表78</li>
      <li>数据列表79</li>
      <li>数据列表80</li>
      <li>数据列表81</li>
      <li>数据列表82</li>
      <li>数据列表83</li>
      <li>数据列表84</li>
      <li>数据列表85</li>
      <li>数据列表86</li>
      <li>数据列表87</li>
      <li>数据列表88</li>
      <li>数据列表89</li>
      <li>数据列表90</li>
      <li>数据列表91</li>
      <li>数据列表92</li>
      <li>数据列表93</li>
      <li>数据列表94</li>
      <li>数据列表95</li>
      <li>数据列表96</li>
      <li>数据列表97</li>
      <li>数据列表98</li>
      <li>数据列表99</li>
      <li>数据列表100</li>
    </ul>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data(){
      return{
        scroll:null
      }
    },
    mounted() {
      this.scroll =new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      this.scroll.on('scroll',(position)=>{
        console.log(position)
      })
      this.scroll.on('pullingUp',()=>{
        console.log('上拉加载更多');
      })
    },
    methods:{
      btnClick(){
        console.log('btnclick');
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
