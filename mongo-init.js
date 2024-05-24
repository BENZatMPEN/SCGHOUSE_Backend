db.createUser({
  user: 'admin',
  pwd: 'ajbear1969',
  roles: [{ role: 'readWrite', db: 'production_analysis' }]
});

db = db.getSiblingDB('production_analysis');

db.createCollection('colors')
db.createCollection('history_work_schedule')
db.createCollection('house_production_records')
db.createCollection('jwt_tokens')
db.createCollection('log_cross_zone')
db.createCollection('log_installation_date')
db.createCollection('log_modbus')
db.createCollection('part_production_records')
db.createCollection('production_data')
db.createCollection('qr_data')
db.createCollection('zone1_production_data')

db.createCollection('users')
db.users.insert([
  {
    "username": "admin",
    "password": "$2a$10$HI5NqGdm6VgeWSFJv1n31e4Q6EqQPK1AA0rwPtPtzYhJz.t2bGoNm",
    "email": "admin@mail.com",
    "role": "admin",
    "created_at": new Date(),
    "updated_at": null
  },
  {
    "username": "admin1",
    "password": "$2a$10$9/OqgxOg41/QHm77RJjWReUyZr7NFpSqwF18FfGn8RJujVv0uK7QS",
    "email": "admin@mail.com",
    "role": "admin",
    "created_at": new Date(),
    "updated_at": null
  },
  {
    "username": "admin2",
    "password": "$2a$10$kYnO0eEkua8YibG5YGr/lOM0rKJTqUczYCJOo4Evb3hIen.s9Bv5e",
    "email": "admin@mail.com",
    "role": "admin",
    "created_at": new Date(),
    "updated_at": null
  }
])


db.createCollection('work_schedule')
db.work_schedule.insert([
  {
    "day": "Tuesday",
    "morning": {
      "start": {
        "hour": 7,
        "minute": 30
      },
      "end": {
        "hour": 12,
        "minute": 0
      }
    },
    "afternoon": {
      "start": {
        "hour": 13,
        "minute": 0
      },
      "end": {
        "hour": 16,
        "minute": 30
      }
    },
    "overtime": {
      "start": {
        "hour": 0,
        "minute": 0
      },
      "end": {
        "hour": 0,
        "minute": 0
      },
      "is_active": false
    },
    "is_active": true,
    "index": 2
  },
  {
    "day": "Wednesday",
    "morning": {
      "start": {
        "hour": 7,
        "minute": 30
      },
      "end": {
        "hour": 12,
        "minute": 0
      }
    },
    "afternoon": {
      "start": {
        "hour": 13,
        "minute": 0
      },
      "end": {
        "hour": 16,
        "minute": 30
      }
    },
    "overtime": {
      "start": {
        "hour": 0,
        "minute": 0
      },
      "end": {
        "hour": 0,
        "minute": 0
      },
      "is_active": false
    },
    "is_active": true,
    "index": 3
  },
  {
    "day": "Thursday",
    "morning": {
      "start": {
        "hour": 7,
        "minute": 30
      },
      "end": {
        "hour": 12,
        "minute": 0
      }
    },
    "afternoon": {
      "start": {
        "hour": 13,
        "minute": 0
      },
      "end": {
        "hour": 16,
        "minute": 30
      }
    },
    "overtime": {
      "start": {
        "hour": 0,
        "minute": 0
      },
      "end": {
        "hour": 0,
        "minute": 0
      },
      "is_active": false
    },
    "is_active": true,
    "index": 4
  },
  {
    "day": "Friday",
    "morning": {
      "start": {
        "hour": 7,
        "minute": 30
      },
      "end": {
        "hour": 12,
        "minute": 0
      }
    },
    "afternoon": {
      "start": {
        "hour": 13,
        "minute": 0
      },
      "end": {
        "hour": 16,
        "minute": 30
      }
    },
    "overtime": {
      "start": {
        "hour": 0,
        "minute": 0
      },
      "end": {
        "hour": 0,
        "minute": 0
      },
      "is_active": false
    },
    "is_active": true,
    "index": 5
  },
  {
    "day": "Saturday",
    "morning": {
      "start": {
        "hour": 7,
        "minute": 30
      },
      "end": {
        "hour": 12,
        "minute": 0
      }
    },
    "afternoon": {
      "start": {
        "hour": 13,
        "minute": 0
      },
      "end": {
        "hour": 16,
        "minute": 30
      }
    },
    "overtime": {
      "start": {
        "hour": 0,
        "minute": 0
      },
      "end": {
        "hour": 0,
        "minute": 0
      },
      "is_active": false
    },
    "is_active": false,
    "index": 6
  },
  {
    "day": "Sunday",
    "morning": {
      "start": {
        "hour": 7,
        "minute": 0
      },
      "end": {
        "hour": 12,
        "minute": 0
      }
    },
    "afternoon": {
      "start": {
        "hour": 13,
        "minute": 0
      },
      "end": {
        "hour": 17,
        "minute": 0
      }
    },
    "overtime": {
      "start": {
        "hour": 0,
        "minute": 0
      },
      "end": {
        "hour": 0,
        "minute": 0
      },
      "is_active": false
    },
    "is_active": false,
    "index": 7
  },
  {
    "day": "Monday",
    "morning": {
      "start": {
        "hour": 7,
        "minute": 30
      },
      "end": {
        "hour": 12,
        "minute": 0
      }
    },
    "afternoon": {
      "start": {
        "hour": 13,
        "minute": 0
      },
      "end": {
        "hour": 16,
        "minute": 30
      }
    },
    "overtime": {
      "start": {
        "hour": 0,
        "minute": 0
      },
      "end": {
        "hour": 0,
        "minute": 0
      },
      "is_active": false
    },
    "is_active": true,
    "index": 1
  }
]);