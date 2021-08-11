const currentProductMetaFourChars = {
  'recommended': {
    'false': '8',
    'true': '28'
  },
  'characteristics': {
    'Size': {
      'id': 94649,
      'value': '3.2222222222222222'
    },
    'Width': {
      'id': 94650,
      'value': '2.7777777777777778'
    },
    'Comfort': {
      'id': 94651,
      'value': '3.1666666666666667'
    },
    'Quality': {
      'id': 94652,
      'value': '2.9444444444444444'
    }
  }
};

const currentProductMetaTwoChars = {
  'characteristics': {
    'Size': {
      'id': 94649,
      'value': '3.2222222222222222'
    },
    'Width': {
      'id': 94650,
      'value': '2.7777777777777778'
    },
  }
};

const dummyReviews = [
  {
    'review_id': 408326,
    'rating': 4,
    'summary': 'Eveniet autem explicabo libero placeat rem harum id ad neque.',
    'recommend': true,
    'response': null,
    'body': 'Fugiat nemo quasi quaerat eos. Excepturi similique sint reprehenderit quia vel sit aperiam mollitia. Fugit facere distinctio cupiditate repudiandae tenetur illo. Quibusdam debitis quis voluptatibus omnis ad molestias ratione vero. Quisquam quas et maiores aliquam culpa dolorem.',
    'date': '2021-06-23T00:00:00.000Z',
    'reviewer_name': 'Verna47',
    'helpfulness': 24,
    'photos': [
      {
        'id': 768104,
        'url': 'https://images.unsplash.com/photo-1522653216850-4f1415a174fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80'
      },
      {
        'id': 768105,
        'url': 'https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80'
      },
      {
        'id': 768106,
        'url': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
      }
    ]
  },
  {
    'review_id': 408314,
    'rating': 2,
    'summary': 'Iusto libero mollitia molestiae rerum aut.',
    'recommend': true,
    'response': null,
    'body': 'Ad cupiditate dicta minus dignissimos maiores aut est fuga repudiandae. Id sint delectus commodi. Similique laborum modi at rerum.',
    'date': '2020-11-15T00:00:00.000Z',
    'reviewer_name': 'Henry_Stamm33',
    'helpfulness': 23,
    'photos': [
      {
        'id': 768126,
        'url': 'https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
      }
    ]
  },
  {
    'review_id': 408324,
    'rating': 4,
    'summary': 'Dolorum consectetur deleniti.',
    'recommend': true,
    'response': null,
    'body': 'Ad et et. Ipsa non molestiae asperiores perspiciatis voluptates voluptates ipsam quis. Omnis accusamus id. Quas dolorem id nihil iure consequuntur omnis. Porro facilis voluptatibus exercitationem. Et dolor eligendi cum maiores nobis molestias non occaecati.',
    'date': '2021-02-12T00:00:00.000Z',
    'reviewer_name': 'Angie87',
    'helpfulness': 18,
    'photos': [
      {
        'id': 768109,
        'url': 'https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
      },
      {
        'id': 768110,
        'url': 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80'
      }
    ]
  },
  {
    'review_id': 408321,
    'rating': 1,
    'summary': 'Repellat sed reprehenderit deserunt.',
    'recommend': false,
    'response': null,
    'body': 'Consequatur rem voluptas at ut iusto natus. Saepe veniam commodi quaerat et tempore sint sed. Quam explicabo vel est dolor laborum neque.',
    'date': '2020-10-09T00:00:00.000Z',
    'reviewer_name': 'Serenity.Mayert',
    'helpfulness': 17,
    'photos': [
      {
        'id': 768113,
        'url': 'https://images.unsplash.com/photo-1472186422470-1f3fbde547aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1647&q=80'
      },
      {
        'id': 768114,
        'url': 'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      },
      {
        'id': 768115,
        'url': 'https://images.unsplash.com/photo-1531889947080-bc5693ae9fa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80'
      }
    ]
  },
  {
    'review_id': 408312,
    'rating': 2,
    'summary': 'Dolorem reiciendis beatae occaecati rerum.',
    'recommend': true,
    'response': '"Perferendis nisi et."',
    'body': 'Officia omnis consectetur odio dignissimos tempore dolor. Perferendis beatae voluptatem sapiente vel quia odio id. Voluptas natus perferendis nulla tempore velit tempora eligendi ut. Quis blanditiis aperiam nihil et sequi sed. Qui eos nulla enim quia ratione porro sit voluptatibus. Est doloremque quos distinctio.',
    'date': '2020-08-25T00:00:00.000Z',
    'reviewer_name': 'Amelia54',
    'helpfulness': 17,
    'photos': [
      {
        'id': 768130,
        'url': 'https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80'
      }
    ]
  },
  {
    'review_id': 408315,
    'rating': 1,
    'summary': 'Dolorem amet distinctio rerum officiis ratione cum minima inventore.',
    'recommend': false,
    'response': null,
    'body': 'Dolore expedita ut quam ut et. Nobis quia ab impedit voluptas voluptas quo ipsam officia. Deleniti delectus nihil molestias voluptas et eum pariatur quis et. Asperiores et aliquam voluptates rerum cum. Dicta autem id. Vel accusamus non.',
    'date': '2020-09-02T00:00:00.000Z',
    'reviewer_name': 'Gennaro.Green68',
    'helpfulness': 14,
    'photos': [
      {
        'id': 768125,
        'url': 'https://images.unsplash.com/photo-1558118070-09ba9a9efb2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
      }
    ]
  },
  {
    'review_id': 408319,
    'rating': 4,
    'summary': 'Dolores cumque a ipsam.',
    'recommend': true,
    'response': null,
    'body': 'Eum molestias atque. Consequatur amet aut similique. Beatae voluptatem repellendus voluptatem suscipit. Excepturi et dolorem. Et earum ut nam consequatur. Impedit ex non illo amet tenetur atque hic.',
    'date': '2021-04-06T00:00:00.000Z',
    'reviewer_name': 'Edna.Lueilwitz',
    'helpfulness': 11,
    'photos': [
      {
        'id': 768117,
        'url': 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80'
      },
      {
        'id': 768118,
        'url': 'https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80'
      },
      {
        'id': 768119,
        'url': 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
      }
    ]
  },
  {
    'review_id': 408323,
    'rating': 3,
    'summary': 'Labore et quos iste amet.',
    'recommend': true,
    'response': null,
    'body': 'Voluptatem nostrum fuga ut natus fuga neque et assumenda neque. Dolorum rerum et perferendis. Eius accusamus esse fugit commodi quam eveniet reiciendis ea atque. Quae praesentium nulla in saepe doloribus omnis autem distinctio aliquid. Laborum modi et reprehenderit sequi.',
    'date': '2021-01-28T00:00:00.000Z',
    'reviewer_name': 'Madisyn_Ledner61',
    'helpfulness': 10,
    'photos': [
      {
        'id': 768111,
        'url': 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
      }
    ]
  },
  {
    'review_id': 408311,
    'rating': 3,
    'summary': 'Repudiandae dolorem occaecati dolorem accusamus qui.',
    'recommend': true,
    'response': null,
    'body': 'Quae dolore officiis rem iure dolorem expedita autem. Quae libero nisi sint et sed voluptas. Laboriosam voluptas ut. Ad ducimus voluptas voluptatibus. Vero est dolores odio porro dolorem quas.',
    'date': '2021-07-10T00:00:00.000Z',
    'reviewer_name': 'Jerome_Dooley42',
    'helpfulness': 10,
    'photos': [
      {
        'id': 768131,
        'url': 'https://images.unsplash.com/photo-1547597456-4c18a06d9073?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
      },
      {
        'id': 768132,
        'url': 'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      },
      {
        'id': 768133,
        'url': 'https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ]
  },
  {
    'review_id': 408317,
    'rating': 1,
    'summary': 'Similique rerum non iure fugiat suscipit.',
    'recommend': false,
    'response': null,
    'body': 'Ut nam omnis. Cumque qui deserunt deleniti fugit quia. Dolores minima quos asperiores ut. Eveniet nulla ratione sequi voluptatem minus qui. Enim quaerat quae nobis labore. Magni ut dolorem consectetur nostrum aspernatur velit officia dolores consequatur.',
    'date': '2020-08-19T00:00:00.000Z',
    'reviewer_name': 'Shayne30',
    'helpfulness': 8,
    'photos': [
      {
        'id': 768121,
        'url': 'https://images.unsplash.com/photo-1522653216850-4f1415a174fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80'
      }
    ]
  },
  {
    'review_id': 408325,
    'rating': 2,
    'summary': 'Rerum id cupiditate quis animi unde placeat possimus.',
    'recommend': true,
    'response': null,
    'body': 'Molestias nisi unde qui quia dolores. Amet quaerat eos sunt fugiat. Sint deserunt quia. Eius sequi blanditiis quam vitae nemo aut. Aut libero provident repellendus architecto vel rerum maxime debitis adipisci.',
    'date': '2020-10-16T00:00:00.000Z',
    'reviewer_name': 'Emelie_Pacocha19',
    'helpfulness': 7,
    'photos': [
      {
        'id': 768107,
        'url': 'https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      },
      {
        'id': 768108,
        'url': 'https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
      }
    ]
  },
  {
    'review_id': 408316,
    'rating': 5,
    'summary': 'Aut sint iusto eligendi quod quo non et.',
    'recommend': true,
    'response': null,
    'body': 'Nihil omnis porro enim hic aut. Distinctio error quaerat et eos consequatur eos quos autem tempore. Et corporis consectetur. Quia minus qui distinctio.',
    'date': '2021-06-11T00:00:00.000Z',
    'reviewer_name': 'Neoma_Hudson',
    'helpfulness': 7,
    'photos': [
      {
        'id': 768122,
        'url': 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
      },
      {
        'id': 768123,
        'url': 'https://images.unsplash.com/photo-1554735490-80893c93b06f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      },
      {
        'id': 768124,
        'url': 'https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ]
  },
  {
    'review_id': 408327,
    'rating': 4,
    'summary': 'Cumque facere sit et.',
    'recommend': true,
    'response': null,
    'body': 'Aut velit non repellat quas recusandae. Itaque ipsa sunt quaerat aliquid. Voluptas ipsam dolor quo voluptas.',
    'date': '2021-06-02T00:00:00.000Z',
    'reviewer_name': 'Devon3',
    'helpfulness': 4,
    'photos': [
      {
        'id': 768101,
        'url': 'https://images.unsplash.com/photo-1500699889581-a7f97ec155d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
      },
      {
        'id': 768102,
        'url': 'https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80'
      },
      {
        'id': 768103,
        'url': 'https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ]
  },
  {
    'review_id': 408320,
    'rating': 1,
    'summary': 'Rem voluptate et totam.',
    'recommend': false,
    'response': null,
    'body': 'Omnis repellat ab deleniti in tempora natus tempore facilis. Nihil placeat ut quam. Ex occaecati inventore. Illo dolor voluptas amet sapiente consequatur nemo odit. Voluptatem totam cupiditate quasi velit aperiam sit ad.',
    'date': '2021-06-15T00:00:00.000Z',
    'reviewer_name': 'Justus.Greenholt',
    'helpfulness': 4,
    'photos': [
      {
        'id': 768116,
        'url': 'https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ]
  },
  {
    'review_id': 408322,
    'rating': 4,
    'summary': 'Iure iure totam doloribus eum tenetur praesentium.',
    'recommend': true,
    'response': null,
    'body': 'Unde ut assumenda harum. Fugit eveniet odit est. Impedit tenetur laudantium dolor tempora dolores ut aut sunt eos. Esse nemo iure nulla. Architecto voluptates aut enim accusantium pariatur assumenda ut.',
    'date': '2021-02-10T00:00:00.000Z',
    'reviewer_name': 'Verna_Tromp',
    'helpfulness': 2,
    'photos': [
      {
        'id': 768112,
        'url': 'https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ]
  },
  {
    'review_id': 408313,
    'rating': 4,
    'summary': 'Sit aut nam aspernatur quaerat praesentium.',
    'recommend': true,
    'response': null,
    'body': 'Dolorem laborum iusto libero et officiis aut ut aliquam similique. Dolorum alias deserunt odio eius quaerat nam blanditiis velit. Animi sit quisquam aut ipsum dolorem minus nam. Voluptatem quae qui suscipit cumque ut unde. Asperiores corrupti quod quia iure dolore. Atque et occaecati voluptatem voluptas itaque suscipit nostrum.',
    'date': '2020-10-15T00:00:00.000Z',
    'reviewer_name': 'Kirsten44',
    'helpfulness': 1,
    'photos': [
      {
        'id': 768127,
        'url': 'https://images.unsplash.com/photo-1470434767159-ac7bf1b43351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
      },
      {
        'id': 768128,
        'url': 'https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80'
      },
      {
        'id': 768129,
        'url': 'https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ]
  },
  {
    'review_id': 408318,
    'rating': 4,
    'summary': 'Quia et magnam corrupti dolor et quisquam itaque.',
    'recommend': true,
    'response': null,
    'body': 'Nisi rem rerum. Unde a excepturi et et. Eaque iure nam.',
    'date': '2021-01-07T00:00:00.000Z',
    'reviewer_name': 'Edyth_Daugherty13',
    'helpfulness': 0,
    'photos': [
      {
        'id': 768120,
        'url': 'https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80'
      }
    ]
  }
];

export {
  currentProductMetaFourChars,
  currentProductMetaTwoChars,
  dummyReviews
};