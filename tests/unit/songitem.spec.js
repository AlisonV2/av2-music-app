import SongItem from '@/components/SongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('SongItem.vue', () => {
    test('renders song.docID in id attribute', () => {
        const song = {
          docID: 'abc',
        };
    
        const wrapper = shallowMount(SongItem, {
          propsData: {
            song,
          },
          global: {
            components: {
              'router-link': RouterLinkStub,
            },
          },
        });
    
        expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`);
        //expect(wrapper.classes()).toContain(`song-id-${song.docID}`);
      });
});
